const formatDate = (date) => {
    let parsed;
    if (date.search('-') !== -1) {
        parsed = date.split('-').map(s => parseInt(s));
    }
    else {
        parsed = date.split('/');
    }
    if (parsed[2] < 1000) {
        parsed[2] += 2000;
    }
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date(parsed[2], parsed[0] - 1, parsed[1]).toLocaleDateString(
        'en-US',
        options
    );
    return formattedDate;
}

export default formatDate;