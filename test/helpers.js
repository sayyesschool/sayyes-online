function at(time = '00:00') {
    return `2022-01-01T${time}:00Z`;
}

module.exports.at = at;