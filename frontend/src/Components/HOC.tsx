import React, { useEffect } from 'react';

function withLogger<P>(WrappedComponent: React.ComponentType<P>) {
  return function EnhancedComponent(props: P) {
    useEffect(() => {
      console.log("Props received:", props);
    }, [props]);
    return <WrappedComponent {...props} />;
  };
}

type UserProps = { name: string };

function User({ name }: UserProps) {
  return <h3>Hello, {name}</h3>;
}

export default withLogger<UserProps>(User);
