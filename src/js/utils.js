const alphabet = 'AaĄąBbCcĆćDdEeFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż';

export default function polishAlphabetSort(a, b) {
    let indexA = alphabet.indexOf(a[0]);
    let indexB = alphabet.indexOf(b[0]);

    if (indexA === indexB) {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
        return 0;
    } else {
        return indexA - indexB;
    }
}
