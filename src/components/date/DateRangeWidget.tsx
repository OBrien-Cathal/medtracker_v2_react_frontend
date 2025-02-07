import {useState} from "react";
import {IDateRange} from "../../types/generic.type.ts";
import DateWidget from "./DateWidget.tsx";


type Props = {
    dateRange: IDateRange
    updateRange: Function

}
const DateRangeWidget = ({dateRange, updateRange}: Props) => {
    const [startDate, setStartDate] = useState<string>(dateRange.start)
    const [endDate, setEndDate] = useState<string>(dateRange.end)

    function onClickRefresh() {
        updateRange(newDateRange(startDate, endDate))
    }

    //
    // function onChangeStart(start: string) {
    //
    // }
    //
    // function onChangeEnd(end: string) {
    //
    // }

    function newDateRange(start: string, end: string): IDateRange {
        return {start: start, end: end}
    }

    return (

        <div className={'date-range-widget'}>
            <div className={'start-date'}>
                <DateWidget date={startDate} updateDate={setStartDate}/>
            </div>
            <div className={'date-range-center'}>

                <div className={'date-range-refresh'}>
                    <input className={'inputButton'} type='submit' value={'Refresh'}
                           onClick={onClickRefresh}/>
                </div>
            </div>

            <div className={'end-date'}>
                <DateWidget date={endDate} updateDate={setEndDate}/>
            </div>

        </div>

    )
}

export default DateRangeWidget