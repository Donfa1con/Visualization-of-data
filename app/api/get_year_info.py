def execute(cursor, trend, year, exam_type, subjects):
    """
    :param cursor: DB cursor
    :param trend: current trend
    :param year: integer year number
    :param subjects: string id_subjects
    :return: json for yandex.map
    """

    subjects_info = cursor.execute('''
        SELECT
            ex.subject_id subject_id,
            ex.school_id school_id,
            ex.%s %s,
            ex.exam_type exam_type,
            s.name name
        FROM exam_result ex
        LEFT JOIN subjects s ON s.subject_id = ex.subject_id
        WHERE ex.year = %s AND
              ex.subject_id in (%s) AND
	          ex.%s != '-' AND ex.%s != '' AND
	          ex.exam_type = '%s'
	    ORDER BY school_id
        ''' % (trend, trend, year, subjects, trend, trend, exam_type))

    subjects_info = [{
        'subject_id': subject_info['subject_id'],
        'school_id': subject_info['school_id'],
        'exam_type': subject_info['exam_type'],
        trend: subject_info[trend],
        'name': subject_info['name']
    } for subject_info in subjects_info]

    schools_info = cursor.execute('''
        SELECT DISTINCT
            ex.school_id school_id,
            s.name name,
            s.address address,
            s.website website,
            s.latitude latitude,
            s.longitude longitude
        FROM exam_result ex
        LEFT JOIN schools s ON s.school_id = ex.school_id
        WHERE ex.year = %s AND
              ex.subject_id in (%s) AND
              ex.%s != '-' AND ex.%s != '' AND
              ex.exam_type = '%s'
        ORDER BY ex.school_id
        ''' % (year, subjects, trend, trend, exam_type))
    features = create_features_schools(schools_info, trend, year)
    update_features_balloon_content(subjects_info, features, trend)
    response = {
        "type": "FeatureCollection",
        "features": features
    }
    return response


def create_features_schools(schools_info, trend, year):
    features = []
    for index, row in enumerate(schools_info):
        feature = {
            "type": "Feature",
            "id": row["school_id"],
            "geometry": {
                "type": "Point",
                "coordinates": [row['latitude'], row['longitude']]
            },
            "properties": {
                "balloonContent": "%s%s%s%s" %
                                  (("%s<br>" % row['name']),
                                   ("<strong>Адрес:</strong> %s<br>" % row['address']),
                                   ("<strong>Сайт:</strong> %s<br>" % row['website']),
                                   ("<strong>%s по предметам за %s год:</strong><br>" %
                                    (get_balloon_trend(trend), year))),
                'balloonContentHeader': "Метка %s" % index
            },
            "options": {
                "preset": 0
            }
        }
        features.append(feature)
    return features


def update_features_balloon_content(subjects_info, features, trend):
    mid_results = {}
    for feature in features:
        sum_trend = 0
        number_of_trends = 0
        for row in subjects_info:
            if feature["id"] == row['school_id']:
                feature["properties"]["balloonContent"] += ("<strong>%s:</strong> %s<br>" %
                                                            (row["name"],
                                                             get_score_trend(row, trend)))
                sum_trend += get_score_trend(row, trend)
                number_of_trends += 1
                mid_results[feature["id"]] = round(sum_trend / number_of_trends, 2)

    for feature in features:
        for result in mid_results:
            if feature["id"] == result:
                mid_score = mid_results[feature["id"]]
                feature["properties"]["balloonContent"] += ("<strong>%s</strong> %s" %
                                                            ("Среднее значение тренда:",
                                                             mid_score))
                feature["options"]["preset"] = get_feature_options_color(mid_score, trend)
                break


def get_balloon_trend(trend):
    if trend == "gpa":
        return 'Средний балл'
    elif trend == "amount":
        return 'Количество учеников'
    else:
        return 'Справляемость'


def get_score_trend(row, trend):
    oge_russianlanguage_index = 2.5641
    oge_mathematics_index = 2.63158
    ege_mathematics_index = 20
    row[trend] = float(str(row[trend]).replace(",", "."))
    if trend == "gpa":
        if row["subject_id"] == 1 and row["exam_type"] == "OGE":
            return round(oge_russianlanguage_index * row[trend], 2)
        elif row["subject_id"] == 2:
            return round(oge_mathematics_index * row[trend], 2)
        elif row["subject_id"] == 4:
            return ege_mathematics_index * row[trend]
        else:
            return row[trend]
    return row[trend]


def get_feature_options_color(mid_score, trend):
    if trend == 'amount':
        cluster_one = 20
        cluster_two = 15
        cluster_three = 10
    elif trend == 'gpa':
        cluster_one = 65
        cluster_two = 55
        cluster_three = 45
    else:
        cluster_one = 100
        cluster_two = 85
        cluster_three = 70

    if mid_score >= cluster_one:
        return 'islands#darkGreenDotIcon'
    elif mid_score >= cluster_two:
        return 'islands#greenDotIcon'
    elif mid_score >= cluster_three:
        return 'islands#darkOrangeDotIcon'
    else:
        return 'islands#redDotIcon'
