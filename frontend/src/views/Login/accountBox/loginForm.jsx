import React, { useContext, useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import api from '../../../utils/api';
import { GlobalContext } from '../../../GlobalContext';

import '../login.css';
import axios from "axios";

export function LoginForm(props) {
  const history = useHistory();
  const { switchToSignup } = useContext(AccountContext);

  const { user } = useContext(GlobalContext);
  const [ userData, setUserData ] = user;

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
        <Input type="password" placeholder="Password" value={userData.password} onChange={(e) => setUserData({...userData,password: e.target.value})}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={async () => {
        const data = await api.authUser(userData.email, userData.password);
        setUserData(data);
        if(userData.email){
          history.push('/user/dashboard');
        }
        }}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
