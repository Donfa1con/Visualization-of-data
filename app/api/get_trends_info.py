def execute(cursor, trend, subjects):
    """
    :param cursor: DB cursor
    :param trend: current trend
    :param subjects: string id_subjects
    :return: json for yandex.map
    """

    subjects_info = cursor.execute('''
        SELECT
            ex15.school_id schol_id,
            ex15.%s,
            ex16.%s,
            s.name name
        FROM exam_result ex15
        INNER JOIN (SELECT 
			ex16.school_id,
			ex16.subject_id,
			ex16.%s
		    FROM exam_result ex16
		    WHERE ex16.year = 2016 AND
		   	  ex16.%s != '' AND ex16.%s != '-' 
		   ) ex16 ON ex15.school_id = ex16.school_id AND 
			     ex15.subject_id = ex16.subject_id
        LEFT JOIN subjects s ON s.subject_id = ex15.subject_id
        WHERE ex15.year = 2015 AND
              ex15.subject_id in (%s) AND
              ex15.%s != '' AND ex15.%s != '-'
        ''' % (trend, trend, trend, trend, trend, subjects, trend, trend))

    subjects_info = [{
        trend: round(get_number(subject_info['ex15.%s' % trend]) -
                     get_number(subject_info['ex16.%s' % trend]), 2),
        'school_id': subject_info['schol_id'],
        'name': subject_info['name']
    } for subject_info in subjects_info]

    schools_info = cursor.execute('''
        SELECT DISTINCT
              ex15.school_id school_id,
              ex16.name name,
              ex16.address address,
              ex16.website website,
              ex16.latitude latitude,
              ex16.longitude longitude
        FROM exam_result ex15
        INNER JOIN (SELECT 
			ex16.school_id school_id,
			ex16.subject_id subject_id,
			s.name name,
      			s.address address,
      			s.website website,
      			s.latitude latitude,
      			s.longitude longitude
		    FROM exam_result ex16
		    LEFT JOIN schools s ON s.school_id = ex16.school_id
		    WHERE ex16.year = 2016 AND
      			  ex16.%s != '-' AND ex16.%s != ''
		   ) ex16 ON ex15.school_id = ex16.school_id AND
			     ex15.subject_id = ex16.subject_id
        WHERE ex15.year = 2015 AND
              ex15.subject_id in (%s) AND
              ex15.%s != '-' AND ex15.%s != ''
        ORDER BY ex15.school_id
        ''' % (trend, trend, subjects, trend, trend))

    features = create_features_schools(schools_info, trend)
    update_features_balloon_trend_content(subjects_info, features, trend)
    response = {
        "type": "FeatureCollection",
        "features": features
    }
    return response


def create_features_schools(schools_info, trend):
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
                                   ("<strong>Изменение %s по предметам за 2015-2016 год:</strong><br>" %
                                    get_balloon_trend(trend))),
                'balloonContentHeader': "Метка %s" % index
            },
            "options": {
                "preset": 0
            }
        }
        features.append(feature)
    return features


def update_features_balloon_trend_content(subjects_info, features, trend):
    mid_results = {}
    for feature in features:
        sum_trend = 0
        number_of_trends = 0
        color_flags = {}
        for row in subjects_info:
            if feature["id"] == row['school_id']:
                feature["properties"]["balloonContent"] += ("<strong>%s:</strong> %s<br>" %
                                                            (row["name"],
                                                             get_balloon_score(row, trend)))
                score = get_number(row[trend])
                sum_trend += score
                number_of_trends += 1
                mid_results[feature["id"]] = {
                    "mid_score": round(sum_trend / number_of_trends, 2)
                }
                set_color_flag(color_flags, score)
                mid_results[feature["id"]].update(color_flags)

    for feature in features:
        for result in mid_results:
            if feature["id"] == result:
                school_result = mid_results[feature["id"]]
                feature["properties"]["balloonContent"] += ("<strong>%s</strong> %s" %
                                                            ("Среднее изменение тренда:",
                                                             school_result["mid_score"]))
                feature["options"]["preset"] = get_feature_options_color(school_result)
                break


def get_balloon_trend(trend):
    if trend == "gpa":
        return 'среднего балла'
    elif trend == "amount":
        return 'количества учеников'
    else:
        return 'справляемости'


def get_balloon_score(row, trend):
    row[trend] = get_number(row[trend])
    if row[trend] > 0:
        return "+%s" % row[trend]
    else:
        return "%s" % row[trend]


def get_feature_options_color(school_result):
    if not school_result.get('red_flag', 0) and school_result.get('green_flag', 0):
        return 'islands#darkGreenCircleDotIcon'
    elif school_result.get('red_flag', 0) and not school_result.get('green_flag', 0):
        return 'islands#redCircleDotIcon'
    elif school_result.get('red_flag', 0) and school_result.get('green_flag', 0):
        return 'islands#yellowCircleDotIcon'
    else:
        return 'islands#grayCircleDotIcon'


def set_color_flag(color_flags, score):
    if score < 0:
        color_flags["red_flag"] = True
    elif score > 0:
        color_flags["green_flag"] = True


def get_number(not_number):
    number = float(str(not_number).replace(",", "."))
    return number
