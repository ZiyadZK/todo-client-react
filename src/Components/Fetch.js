const Fetch = async (url, options) => {
    const response = await fetch(url, options);
    const result = response.json();
    return result;
}

