/**
 * Created by mark.sancho on 6/27/2017.
 */
'user strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const token = 'EAATKiHYPEmABANfbzt0wOJ6qhDoMDv8fxEhfT6MBdQfnZC1iLoOfDh5GvaxNS3VWxYXYU7hzTpY9oPiOLOLSRnsNjjKZAuwxiuy8MhuuyQMbtwVZCSHFSZBweAZBLh3Ld355dtNQvDLI90HIC2yXw6b3eT7kwURnfCJ653Im8KxlNZAMFROY7d';

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot');
});

app.get('/help', function (req, res) {
    res.send('Privacy Policy');
});

app.get('/tos', function (req, res) {
    res.send('Terms of Service');
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
});

app.post('/webhook/', function (req, res) {
    var messaging_events = req.body.entry[0].messaging
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i]
        var sender = event.sender.id
        if (event.message && event.message.text) {
            var text = event.message.text
            if(text.indexOf('weather') > -1) {
                sendTextMessage(sender, "the weather in manila is cloudy");
            }
            else if(text.indexOf('what time') > -1) {
                var date = new Date();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                sendTextMessage(sender, text);
            } 
			else if(text.indexOf('pogi') > -1) {
				sendTextMessage(sender, "of course you!");
			}
			else {
                sendTextMessage(sender, "try asking about the weather or time.");
            }
        }
    }
    res.sendStatus(200)
});

function sendTextMessage(sender, text) {
    var messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function getCountryCode($search) {
    var country = [];
    country['AF'] = 'Afghanistan';
    country['AX'] = 'Aland Islands';
    country['AL'] = 'Albania';
    country['DZ'] = 'Algeria';
    country['AS'] = 'American Samoa';
    country['AD'] = 'Andorra';
    country['AO'] = 'Angola';
    country['AI'] = 'Anguilla';
    country['AQ'] = 'Antarctica';
    country['AG'] = 'Antigua and Barbuda';
    country['AR'] = 'Argentina';
    country['AM'] = 'Armenia';
    country['AW'] = 'Aruba';
    country['AU'] = 'Australia';
    country['AT'] = 'Austria';
    country['AZ'] = 'Azerbaijan';
    country['BS'] = 'Bahamas';
    country['BH'] = 'Bahrain';
    country['BD'] = 'Bangladesh';
    country['BB'] = 'Barbados';
    country['BY'] = 'Belarus';
    country['BE'] = 'Belgium';
    country['BZ'] = 'Belize';
    country['BJ'] = 'Benin';
    country['BM'] = 'Bermuda';
    country['BT'] = 'Bhutan';
    country['BO'] = 'Bolivia';
    country['BQ'] = 'Bonaire, Saint Eustatius and Saba';
    country['BA'] = 'Bosnia and Herzegovina';
    country['BW'] = 'Botswana';
    country['BV'] = 'Bouvet Island';
    country['BR'] = 'Brazil';
    country['IO'] = 'British Indian Ocean Territory';
    country['VG'] = 'British Virgin Islands';
    country['BN'] = 'Brunei';
    country['BG'] = 'Bulgaria';
    country['BF'] = 'Burkina Faso';
    country['BI'] = 'Burundi';
    country['KH'] = 'Cambodia';
    country['CM'] = 'Cameroon';
    country['CA'] = 'Canada';
    country['CV'] = 'Cape Verde';
    country['KY'] = 'Cayman Islands';
    country['CF'] = 'Central African Republic';
    country['TD'] = 'Chad';
    country['CL'] = 'Chile';
    country['CN'] = 'China';
    country['CX'] = 'Christmas Island';
    country['CC'] = 'Cocos Islands';
    country['CO'] = 'Colombia';
    country['KM'] = 'Comoros';
    country['CK'] = 'Cook Islands';
    country['CR'] = 'Costa Rica';
    country['HR'] = 'Croatia';
    country['CU'] = 'Cuba';
    country['CW'] = 'Curaçao';
    country['CY'] = 'Cyprus';
    country['CZ'] = 'Czech Republic';
    country['CD'] = 'Democratic Republic of the Congo';
    country['DK'] = 'Denmark';
    country['DJ'] = 'Djibouti';
    country['DM'] = 'Dominica';
    country['DO'] = 'Dominican Republic';
    country['TL'] = 'East Timor';
    country['EC'] = 'Ecuador';
    country['EG'] = 'Egypt';
    country['SV'] = 'El Salvador';
    country['GQ'] = 'Equatorial Guinea';
    country['ER'] = 'Eritrea';
    country['EE'] = 'Estonia';
    country['ET'] = 'Ethiopia';
    country['FK'] = 'Falkland Islands';
    country['FO'] = 'Faroe Islands';
    country['FJ'] = 'Fiji';
    country['FI'] = 'Finland';
    country['FR'] = 'France';
    country['GF'] = 'French Guiana';
    country['PF'] = 'French Polynesia';
    country['TF'] = 'French Southern Territories';
    country['GA'] = 'Gabon';
    country['GM'] = 'Gambia';
    country['GE'] = 'Georgia';
    country['DE'] = 'Germany';
    country['GH'] = 'Ghana';
    country['GI'] = 'Gibraltar';
    country['GR'] = 'Greece';
    country['GL'] = 'Greenland';
    country['GD'] = 'Grenada';
    country['GP'] = 'Guadeloupe';
    country['GU'] = 'Guam';
    country['GT'] = 'Guatemala';
    country['GG'] = 'Guernsey';
    country['GN'] = 'Guinea';
    country['GW'] = 'Guinea-Bissau';
    country['GY'] = 'Guyana';
    country['HT'] = 'Haiti';
    country['HM'] = 'Heard Island and McDonald Islands';
    country['HN'] = 'Honduras';
    country['HK'] = 'Hong Kong';
    country['HU'] = 'Hungary';
    country['IS'] = 'Iceland';
    country['IN'] = 'India';
    country['ID'] = 'Indonesia';
    country['IR'] = 'Iran';
    country['IQ'] = 'Iraq';
    country['IE'] = 'Ireland';
    country['IM'] = 'Isle of Man';
    country['IL'] = 'Israel';
    country['IT'] = 'Italy';
    country['CI'] = 'Ivory Coast';
    country['JM'] = 'Jamaica';
    country['JP'] = 'Japan';
    country['JE'] = 'Jersey';
    country['JO'] = 'Jordan';
    country['KZ'] = 'Kazakhstan';
    country['KE'] = 'Kenya';
    country['KI'] = 'Kiribati';
    country['XK'] = 'Kosovo';
    country['KW'] = 'Kuwait';
    country['KG'] = 'Kyrgyzstan';
    country['LA'] = 'Laos';
    country['LV'] = 'Latvia';
    country['LB'] = 'Lebanon';
    country['LS'] = 'Lesotho';
    country['LR'] = 'Liberia';
    country['LY'] = 'Libya';
    country['LI'] = 'Liechtenstein';
    country['LT'] = 'Lithuania';
    country['LU'] = 'Luxembourg';
    country['MO'] = 'Macao';
    country['MK'] = 'Macedonia';
    country['MG'] = 'Madagascar';
    country['MW'] = 'Malawi';
    country['MY'] = 'Malaysia';
    country['MV'] = 'Maldives';
    country['ML'] = 'Mali';
    country['MT'] = 'Malta';
    country['MH'] = 'Marshall Islands';
    country['MQ'] = 'Martinique';
    country['MR'] = 'Mauritania';
    country['MU'] = 'Mauritius';
    country['YT'] = 'Mayotte';
    country['MX'] = 'Mexico';
    country['FM'] = 'Micronesia';
    country['MD'] = 'Moldova';
    country['MC'] = 'Monaco';
    country['MN'] = 'Mongolia';
    country['ME'] = 'Montenegro';
    country['MS'] = 'Montserrat';
    country['MA'] = 'Morocco';
    country['MZ'] = 'Mozambique';
    country['MM'] = 'Myanmar';
    country['NA'] = 'Namibia';
    country['NR'] = 'Nauru';
    country['NP'] = 'Nepal';
    country['NL'] = 'Netherlands';
    country['AN'] = 'Netherlands Antilles';
    country['NC'] = 'New Caledonia';
    country['NZ'] = 'New Zealand';
    country['NI'] = 'Nicaragua';
    country['NE'] = 'Niger';
    country['NG'] = 'Nigeria';
    country['NU'] = 'Niue';
    country['NF'] = 'Norfolk Island';
    country['KP'] = 'North Korea';
    country['MP'] = 'Northern Mariana Islands';
    country['NO'] = 'Norway';
    country['OM'] = 'Oman';
    country['PK'] = 'Pakistan';
    country['PW'] = 'Palau';
    country['PS'] = 'Palestinian Territory';
    country['PA'] = 'Panama';
    country['PG'] = 'Papua New Guinea';
    country['PY'] = 'Paraguay';
    country['PE'] = 'Peru';
    country['PH'] = 'Philippines';
    country['PN'] = 'Pitcairn';
    country['PL'] = 'Poland';
    country['PT'] = 'Portugal';
    country['PR'] = 'Puerto Rico';
    country['QA'] = 'Qatar';
    country['CG'] = 'Republic of the Congo';
    country['RE'] = 'Reunion';
    country['RO'] = 'Romania';
    country['RU'] = 'Russia';
    country['RW'] = 'Rwanda';
    country['BL'] = 'Saint Barthélemy';
    country['SH'] = 'Saint Helena';
    country['KN'] = 'Saint Kitts and Nevis';
    country['LC'] = 'Saint Lucia';
    country['MF'] = 'Saint Martin';
    country['PM'] = 'Saint Pierre and Miquelon';
    country['VC'] = 'Saint Vincent and the Grenadines';
    country['WS'] = 'Samoa';
    country['SM'] = 'San Marino';
    country['ST'] = 'Sao Tome and Principe';
    country['SA'] = 'Saudi Arabia';
    country['SN'] = 'Senegal';
    country['RS'] = 'Serbia';
    country['CS'] = 'Serbia and Montenegro';
    country['SC'] = 'Seychelles';
    country['SL'] = 'Sierra Leone';
    country['SG'] = 'Singapore';
    country['SX'] = 'Sint Maarten';
    country['SK'] = 'Slovakia';
    country['SI'] = 'Slovenia';
    country['SB'] = 'Solomon Islands';
    country['SO'] = 'Somalia';
    country['ZA'] = 'South Africa';
    country['GS'] = 'South Georgia and the South Sandwich Islands';
    country['KR'] = 'South Korea';
    country['SS'] = 'South Sudan';
    country['ES'] = 'Spain';
    country['LK'] = 'Sri Lanka';
    country['SD'] = 'Sudan';
    country['SR'] = 'Suriname';
    country['SJ'] = 'Svalbard and Jan Mayen';
    country['SZ'] = 'Swaziland';
    country['SE'] = 'Sweden';
    country['CH'] = 'Switzerland';
    country['SY'] = 'Syria';
    country['TW'] = 'Taiwan';
    country['TJ'] = 'Tajikistan';
    country['TZ'] = 'Tanzania';
    country['TH'] = 'Thailand';
    country['TG'] = 'Togo';
    country['TK'] = 'Tokelau';
    country['TO'] = 'Tonga';
    country['TT'] = 'Trinidad and Tobago';
    country['TN'] = 'Tunisia';
    country['TR'] = 'Turkey';
    country['TM'] = 'Turkmenistan';
    country['TC'] = 'Turks and Caicos Islands';
    country['TV'] = 'Tuvalu';
    country['VI'] = 'U.S. Virgin Islands';
    country['UG'] = 'Uganda';
    country['UA'] = 'Ukraine';
    country['AE'] = 'United Arab Emirates';
    country['GB'] = 'United Kingdom';
    country['US'] = 'United States';
    country['UM'] = 'United States Minor Outlying Islands';
    country['UY'] = 'Uruguay';
    country['UZ'] = 'Uzbekistan';
    country['VU'] = 'Vanuatu';
    country['VA'] = 'Vatican';
    country['VE'] = 'Venezuela';
    country['VN'] = 'Vietnam';
    country['WF'] = 'Wallis and Futuna';
    country['EH'] = 'Western Sahara';
    country['YE'] = 'Yemen';
    country['ZM'] = 'Zambia';
    country['ZW'] = 'Zimbabwe';
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


