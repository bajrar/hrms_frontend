import { Button } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ padding: '5.5rem 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/images/error.png" alt="error" style={{ height: '400px', width: '400px', objectFit: 'contain' }} />
          <h4 style={{ textAlign: 'center', fontWeight: '600', padding: '1rem 0' }}>Opps!</h4>
          <p
            style={{
              width: '292px',
              textAlign: 'center',
              lineHeight: 2,
              letterSpacing: 1.5,
            }}
          >
            We’re sorry. The page you requested could not be found.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Button
              type="primary"
              style={{
                padding: '1.25rem 2rem',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => navigate('/', { replace: true })}
            >
              Back to the home page
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
