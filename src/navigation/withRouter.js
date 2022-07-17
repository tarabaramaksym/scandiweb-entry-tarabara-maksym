import { useNavigate, useParams, useLocation } from 'react-router-dom';

// This wrapper is required to fully use the react-router-dom 6 library, 
// as it mostly uses hooks with no alternative for class component

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    return (
      <Component
        navigate={navigate}
        params={params}
        location={location}
        {...props}
      />
    );
  };

  return Wrapper;
};