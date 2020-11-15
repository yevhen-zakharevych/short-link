import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreateLinkPage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  useEffect(()=> {
    window.M.updateTextFields();
  }, [])

  const changeHangler = event => {
    setLink(event.target.value)
  };

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });

        history.push(`/link-details/${data.link._id}`);

        console.log(data);
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2 create-link-page">
        <div className="input-field">
          <input
            placeholder="Enter link"
            id="link"
            type="text"
            name="link"
            value={link}
            onChange={changeHangler}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  )
};
