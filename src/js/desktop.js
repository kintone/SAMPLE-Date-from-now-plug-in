/*
 * This sample plug-in converts the date into a '~minutes/hours/etc ago' format in the selected language.
 * The new format is placed in the Record List instead of the original date format.
 * Copyright (c) 2018 Cybozu
 *
 * Licensed under the MIT License
 */
(function(PLUGIN_ID) {
    'use strict';

    // Get plug-in configuration settings
    var CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);
    // Get each settings
    if (!CONFIG) {
        return false;
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    moment.locale(CONFIG.locale);	// Initialize the locale
    var datetimefield = CONFIG.datetime_field;	// Field code of a Datetime field

    // Set the Record List Event
    kintone.events.on('app.record.index.show', function(e) {
        // Get the Datetime fields in the Record List
        var elements = kintone.app.getFieldElements(datetimefield);

        // Display text formatted by Moment.js instead of the initial dates
        for (var i = 0; i < e.records.length; i++) {
            var date = e.records[i][datetimefield].value;
            elements[i].style.verticalAlign = 'middle';
            elements[i].style.padding = '10px';
            elements[i].innerText = capitalizeFirstLetter(moment(date).fromNow());
        }
    });
})(kintone.$PLUGIN_ID);
