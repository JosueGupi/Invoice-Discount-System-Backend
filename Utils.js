function getMonthsAndYearsList(table) {
    function convertMonthName(monthName) {
        const monthsInEnglish = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthsInSpanish = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        let index = monthsInEnglish.indexOf(monthName);
        if (index !== -1) {
            return monthsInSpanish[index];
        } else {
            return "Month not found";
        }
    }

    function generateMonthsAndYearsList(initialDate, endDate) {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        let datesList = [];
        let actualDate = new Date(initialDate); // Establecer la fecha inicial

        while (actualDate <= endDate) {
            let month = months[actualDate.getMonth()];
            let year = actualDate.getFullYear();

            datesList.push({ month: month, year: year, interest: 0 });

            actualDate.setMonth(actualDate.getMonth() + 1); // Avanzar al próximo mes
        }

        return datesList;
    }




    function obtainDates(term, date) {
        const result = [];
        let dateInfo = new Date(date);

        while (term > 0) {
            const month = dateInfo.toLocaleString('default', { month: 'long' });
            const year = Number(dateInfo.toLocaleString('default', { year: 'numeric' }));
            const daysMonth = new Date(dateInfo.getFullYear(), dateInfo.getMonth() + 1, 0).getDate();
            const daysInMonth = daysMonth - dateInfo.getDate() + 1;
            const takenDays = Math.min(term, daysInMonth);

            result.push({ month: month, days: takenDays, interest: 0, year: year, date: dateInfo });
            term -= takenDays;
            dateInfo.setMonth(dateInfo.getMonth() + 1, 1);
        }

        return result;
    }

    //SELECT DE TODA LA TABLA 


    let allStartDates = table.map(obj => new Date(obj.StartDate));
    let allEndDates = table.map(obj => new Date(obj.EndDate));

    let minDate = new Date(Math.min(...allStartDates));
    minDate.setDate(minDate.getDate() + 1);
    let maxDate = new Date(Math.max(...allEndDates));
    maxDate.setDate(maxDate.getDate() + 1);


    // Generar la lista de months y años con nombres de months
    let monthsAndYearsList = generateMonthsAndYearsList(minDate, maxDate);


    for (let k = 0; k < table.length; k++) {

        let result = obtainDates(table[k].Term, table[k].StartDate);
        let totalInterest = (((table[k].Interest / 100) / 30) * table[k].Term * table[k].Total);

        for (let i = 0; i < result.length; i++) {

            let indexAllDates = monthsAndYearsList.findIndex(item => item.month === convertMonthName(result[i].month) && item.year === result[i].year)

            monthsAndYearsList[indexAllDates].interest += (result[i].days / table[i].Term) * totalInterest;
        }

    }
    console.log(monthsAndYearsList)
    return monthsAndYearsList;

}

//monthsAndYearsList contiene = [{month:'', year:"", interest:""},{month:'', year:"", interest:""},{month:'', year:"", interest:""}]