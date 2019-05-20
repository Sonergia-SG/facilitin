/**
* Created by stephane.mallaroni on 11/04/2019.
*/
import React, { Component } from 'react';
import { API_PATH } from '../variables';
import logo from '../images/sonergia.png'
import Loading from './Loading'
import { Redirect } from 'react-router-dom'

class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            mdp: '',
            data : '',
            errors: {},
            step:1,
            api_key: '',
            isLoading:false,
            redirect:false
        }
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.setState({isLoading: true});
        let errors = {};
        let email = this.state.email;
        let mdp = this.state.mdp;
        let formIsValid = true;

        if(!email){
            errors["email"] = "Email ne peut pas être vide";
            formIsValid = false;
        }
        if(!mdp){
            errors["mdp"] = "Mot de passe ne peut pas être vide";
            formIsValid = false;
        }


        if(typeof email !== "undefined"){
             let lastAtPos = email.lastIndexOf('@');
             let lastDotPos = email.lastIndexOf('.');

             if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                 formIsValid = false;
                 errors["email"] = "Cet email n'est pas valide";
             }
        }

        if(formIsValid){
            fetch(API_PATH+'login?email='+email+'&password='+mdp)
                .then( (response) => {
                    return response.json()
                })
                .then( (json) => {
                    if(json.status === 'success'){
                        this.setState({
                            step: 2,
                            api_key:json.api_key,
                            redirect:true
                        })
                        if (this.isComponentMounted) {
                            this.setState({isLoading: false});
                        }
                        //this.props.callbackFromParent({step: this.state.step, api_key: this.state.api_key});
                    }else{
                        this.setState({isLoading: false});
                        errors["formulaire"] = "Identifiants inconnus";
                        this.setState({errors: errors});
                    }
                    if (this.isComponentMounted) {
                        this.setState({isLoading: false});
                    }
                }).catch(function(error) {
                    errors["formulaire"] = "Une erreur s'est produite connexion impossible";
                });
        }else{
            this.setState({isLoading: false});
        }

        this.setState({errors: errors});
    };

    render() {
        if(this.state.redirect){
            return <Redirect push to={{pathname:'/liste', state: { api_key:this.state.api_key } }}/>
        }else {
            return (

                <div className="Connection columns is-mobile is-centered is-vcentered">
                    <div className="box is-half has-text-centered">
                        <div className="has-text-centered content-loading">
                            <div id="loading_connect"><Loading show={this.state.isLoading} type="Puff"/></div>
                            <img src={logo} alt="logo sonergia" width="250"/>
                        </div>
                        <div className="has-text-centered">
                            <form action="#">
                                <div className="field">
                                    <input type="text" id="email" name="email" placeholder="Votre Email"
                                           className="input"
                                           value={this.state.email }
                                           onChange={e => this.setState({ email: e.target.value })}
                                    />
                                    <p style={{color: "red"}}>{this.state.errors["email"]}</p>
                                </div>
                                <div className="field">
                                    <input type="email" id="mdp" name="mdp" placeholder="Votre Mot de passe"
                                           className="input"
                                           value={this.state.mdp }
                                           onChange={e => this.setState({ mdp: e.target.value })}
                                    />
                                    <p style={{color: "red"}}>{this.state.errors["mdp"]}</p>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="submit" onClick={e => this.handleFormSubmit(e)}
                                               className="button is-primary is-outlined is-fullwidth" value="Connexion"/>
                                    </div>
                                </div>
                            </form>
                            <p style={{color: "red"}}>{this.state.errors["formulaire"]}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Connection;