import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import PageHeader from "#/components/PageHeader";
import { DefaultState } from "#/models/default";

export const NotFound: React.FC = () => {
  const [state, setState] = useState<DefaultState>({
    loading: true,
    title: "Not Found",
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: false }));
  }, []);

  return (
    <>
      {state.loading ? (
        <Spinner animation="grow" />
      ) : (
        <Container>
          <PageHeader title={state.title} />
        </Container>
      )}
    </>
  );
};

export default NotFound;
