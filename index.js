const core = require('@actions/core');

try {
    const stringItemsInput = core.getInput('stringItems');
    const listStringInput = core.getInput('listString');
    if (!stringItemsInput) throw new Error("stringItems's required.");

    console.log('---INPUTS---');
    console.log('stringItems:');
    console.log('value:', stringItemsInput);
    console.log('type:', typeof stringItemsInput);
    console.log('listString:');
    console.log('value:', listStringInput);

    let stringItems = stringItemsInput;
    const isMap = stringItems instanceof Map;

    if (isMap) {
        if (stringItems.has('length')) {
            stringItems.delete('length');
        }

        stringItems = [...stringItems.values()];
    }

    const isArray = Array.isArray(stringItems);

    if (!isArray) {
        stringItems = stringItemsInput.substring(1, stringItemsInput.length - 1).split(',');

        if (!Array.isArray(stringItems)) throw new Error('stringItems must be an Array.');
    }

    const allElementsAreString = stringItems.every(el => typeof el === 'string');
    if (!allElementsAreString) throw new Error('stringItems must only contain Strings.');

    let stringList = '';

    if (listStringInput === '') {
        stringList = '- ' + stringArray.join('\n- ');
    } else {
        if (listStringInput.includes('${ITEM}')) {
            stringArray.forEach(element => {
                stringList += listStringInput.replaceAll('${ITEM}', element);
            });
        } else {
            stringList = listStringInput + stringArray.join(`\n${listStringInput}`);
        }
    }

    console.log('\n---OUTPUTS---');
    console.log('stringList:');
    console.log(stringList);

    core.setOutput('stringList', stringList);
} catch (error) {
    core.setFailed(error.message);
}
