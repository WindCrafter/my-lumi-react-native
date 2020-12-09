import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors, imgs } from '../../../../../utlis';

LocaleConfig.locales.vn = {
    monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],
    monthNamesShort: [
        'TH1',
        'TH2',
        'TH3',
        'TH4',
        'TH5',
        'TH6',
        'TH7',
        'TH8',
        'TH9',
        'TH10',
        'TH11',
        'TH12',
    ],
    dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vn';

const DATA = [
    { type: 'break', day: '2020-08-02' },
    { type: 'noCheckout', day: '2020-08-03' },
    { type: 'late', day: '2020-08-04' },
    { type: 'ontime', day: '2020-08-05' },
    { type: 'late', day: '2020-08-06' },
];

const CalendarCustom = (props) => {
    

    return (
        
            <Calendar
                hideExtraDays
                firstDay={0}
                horizontal
                pagingEnabled
                calendarWidth={320}

                
            />

      
    );
};

export default CalendarCustom;


