import { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailLinkPage = () => {
  const { token } = useContext(AuthContext);
  const { request, isLoading} = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetchedLink = await request(`/api/link/${linkId}`, 'GET', null, {
        'Authorization': `Bearer ${token}`
      });
      setLink(fetchedLink);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {link && <LinkCard link={link}/>}
    </>
  )
};
