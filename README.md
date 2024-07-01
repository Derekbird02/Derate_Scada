const calculateTransformerPower = (tNumber) => {
    let transformerPower = 0;

    // Filter relatedAssets to include only assets with unitnumber equal to tNumber
    const relevantAssets = relatedAssets.filter(asset => asset.unitnumber === tNumber && asset.quality !== 0);

    // Iterate over relevantAssets to calculate power
    relevantAssets.forEach(asset => {
        switch (asset.ieccode) {
            case 1:
            case 3:
            case 4:
            case 14:
            case 15:
                transformerPower += parseInt(asset.ratedpower, 10);
                break;
            case 2:
                transformerPower += parseFloat(asset.ratedpower) / 2;
                break;
            default:
                // No action needed for other codes
                break;
        }
    });

    return transformerPower / 1000;
};
