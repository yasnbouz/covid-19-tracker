export function SortCases(data: Array<any>) {
    const sortedData = [...data];

    return sortedData.sort((a, b) => b.cases - a.cases);
}
