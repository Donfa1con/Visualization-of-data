def remove_excess_school_keys(school):
    snap_shot_school = school.copy()
    excess_keys = ['№', 'Number', 'OGE', 'German', 'French','Lat','Long', 'base']
    for key in snap_shot_school.keys():
        for excess_key in excess_keys:
            if excess_key in key:
                del school[key]
                

def remove_excess_schools_and_keys(schools_with_exams_by_years, schools_for_comaparison):
    for year in schools_with_exams_by_years:
        snap_shot_schools = schools_with_exams_by_years[year].copy()
        for school in snap_shot_schools:
            if not school['Code'] in schools_for_comaparison:
                schools_with_exams_by_years[year].remove(school)
            remove_excess_school_keys(school)

def remove_schools_with_mid_score_is_zero(schools_with_exams_by_years, schools_zero):
    for year in schools_with_exams_by_years:
        snap_shot_schools = schools_with_exams_by_years[year].copy()
        for school in snap_shot_schools:
            if school['Code'] in schools_zero:
                schools_with_exams_by_years[year].remove(school)
