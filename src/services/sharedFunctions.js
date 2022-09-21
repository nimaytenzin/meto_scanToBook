/**
 * Converts a date in 12 hrs string format to 24hrs, 4 digit numeric format for easy sorting of time
 * @param  {} dateString "07:30:AM 12 hrs date format"
 */
export function convert12hrsTo24hrsNumeric(dateString){
    const [hr,min, modifier] = dateString.split(':');

    let time = Number(hr);

    if (modifier === 'PM') {
        time = time  + 12;
     }
    return Number(time+min)
}