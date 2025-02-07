import previous from "../../assets/previous.svg";
import next from "../../assets/next.svg"
import {TargetedEvent} from "react";
import {dateStringAdjusted} from "../../date-utils.ts";

type Props = {
    date: string
    updateDate: Function
}
const DateWidget = ({date, updateDate}: Props) => {

    function setDate(dateString: string) {
        console.log('widget date')
        updateDate(dateString)
    }

    function onChangeDate(e: TargetedEvent<HTMLInputElement, Event>) {
        setDate(e.currentTarget.value)
    }

    function incrementDate() {
        setDate(adjustDate(1))
    }

    function decrementDate() {
        setDate(adjustDate(-1))
    }

    function adjustDate(number: number): string {
        return dateStringAdjusted(date, number)
    }

    return (

        <div className={'date-selector-widget'}>
            <div className={'left-date-arrow'}>
                <img src={previous} alt="Collapse Section" onClick={decrementDate}/>
            </div>
            <div className={'current-with-calendar'}>
                <div className={'date-selector-current'}>
                    {date}
                </div>

                <input aria-label="Date"
                       value={
                           date.toString()}
                       type="date"
                       onChange={(ev) => onChangeDate(ev)}
                />
            </div>

            <div className={'right-date-arrow'}>
                <img src={next} alt="Collapse Section" onClick={incrementDate}/>
            </div>

        </div>

    )
}

export default DateWidget