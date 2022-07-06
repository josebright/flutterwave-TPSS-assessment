

export const transactionCalculation  = (transaction) => {
    const initialAmount = transaction.Amount;
    const splitInfo = transaction.SplitInfo;
    const splitInfoWithFlatType = splitInfo.map((item, index) =>({...item, initialIndex: index})).filter((split) => split.SplitType === "FLAT")
    const splitInfoWithPercentageType = splitInfo.map((item, index) =>({...item, initialIndex: index})).filter((split) => split.SplitType === "PERCENTAGE")
    const splitInfoWithRatioType = splitInfo.map((item, index) =>({...item, initialIndex: index})).filter((split) => split.SplitType === "RATIO")
    const initialRatioTotal = splitInfoWithRatioType.reduce((previous, current) => previous + Number(current.SplitValue), 0)
    let initialBalanceB4Ratio;
    let previousBalance = initialAmount;

    let result = {
        "ID": transaction.ID,
        "Balance": previousBalance,
        "SplitBreakdown": []
    }

    splitInfoWithFlatType.forEach(element => {
        previousBalance = previousBalance - element.SplitValue
        result.SplitBreakdown.push({
            "SplitEntityId": element.SplitEntityId,
            "Amount": previousBalance,
            initialIndex: element.initialIndex
        })
    });

    splitInfoWithPercentageType.forEach(element => {
        previousBalance = previousBalance - ((element.SplitValue / 100) * previousBalance)
        result.SplitBreakdown.push({
            "SplitEntityId": element.SplitEntityId,
            "Amount": previousBalance,
            initialIndex: element.initialIndex
        })
    });

    splitInfoWithRatioType.forEach((element, index) => {
        if (index === 0) {
            initialBalanceB4Ratio = previousBalance
        }
        previousBalance =  previousBalance - ((element.SplitValue / initialRatioTotal) * initialBalanceB4Ratio)
        result.SplitBreakdown.push({
            "SplitEntityId": element.SplitEntityId,
            "Amount": previousBalance,
            initialIndex: element.initialIndex
        })
    });

    result = {
        "ID": transaction.ID,
        "Balance": previousBalance,
        "SplitBreakdown": result.SplitBreakdown.sort((a, b) => a.initialIndex - b.initialIndex).map(item => ({"SplitEntityId": item.SplitEntityId,
        "Amount": item.Amount,}))
    };

    return result;
};