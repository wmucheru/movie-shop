import { useEffect, useState } from 'react';

import Alert from './Alert';

import { SETTINGS_URL } from '../utils/urls';
import axios from '../utils/axios';

export default function SettingForm() {
    const [message, setMessage] = useState('');
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        axios.get(SETTINGS_URL)
            .then(response => {
                // console.log(response);

                if (response.status === 200) {
                    setSettings(response.data);
                }
                else {
                    setMessage('Could not fetch settings');
                }
            })
            .catch(e => {
                console.log(e)
                setMessage('Error fetching settings');
            });

    }, [SETTINGS_URL]);

    const onSave = () => {
        axios.put(SETTINGS_URL, {
            settings: JSON.stringify(settings)
        })
            .then(response => {
                // console.log(response);

                if (response.status === 200) {
                    setMessage(response.data.message);
                }
                else {
                    setMessage('Could not save settings');
                }
            })
            .catch(e => {
                console.log(e)
                setMessage('Error saving settings');
            });
    }

    const onChange = (index, e) => {
        const newSettings = [...settings];
        newSettings[index].value = e.target.value;
        setSettings(newSettings);
    }

    const listSettings = () => {
        if (settings === undefined || settings.length === 0) {
            return <Alert text="No settings added" />;
        }

        return (
            <>
                {
                    message !== '' ? <Alert text={message} /> : null
                }
                {
                    settings.map((s, i) => {
                        return (
                            <div key={i} className="form-group">
                                <label
                                    htmlFor={`s-${s._id}`}
                                    className="control-label col-sm-4">{s.name}</label>

                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        id={`s-${s._id}`}
                                        className="form-control"
                                        value={s.value}
                                        onChange={e => onChange(i, e)}
                                        autoComplete="off"
                                        required />
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    return (
        <div className="col-sm-6 form-horizontal">
            {listSettings()}
            <div className="form-group">
                <div className="col-sm-offset-4 col-sm-8">
                    <hr />
                    <button
                        className="btn btn-lg btn-block btn-primary"
                        onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
}