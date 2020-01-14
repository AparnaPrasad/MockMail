import React from "react";
import { FormattedDate, FormattedTime, FormattedRelativeTime } from "react-intl";

interface Props {
    dateStamp: number,
    showAgo?: boolean
}



const MailListDateComponent = ({ dateStamp, showAgo }: Props) => {
    const date = new Date(dateStamp * 1000);
    const today = new Date();
    const stamp = dateStamp * 1000;
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
        
        const diffSecs = (date.getTime() - today.getTime())/1000;
        
        return <React.Fragment>
            <FormattedTime value={stamp} />
            {showAgo && <span>(<FormattedRelativeTime unit="second" value={diffSecs} updateIntervalInSeconds={60} />)</span>}
        </React.Fragment>
    }
    if (date.getFullYear() === today.getFullYear()) {
        return <FormattedDate value={stamp} day='numeric' month='short' />
    }
    return < FormattedDate value={stamp} day='numeric' month = 'short' year = 'numeric' />
}

export default MailListDateComponent;
