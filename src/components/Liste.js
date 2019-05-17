/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ReactTable from "react-table";
import { API_PATH } from '../variables';
import 'react-table/react-table.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Loading from './Loading'
import HeaderNav from './Header'

class Liste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: this.props.location.state === undefined ? false : this.props.location.state.api_key,
            num_tab:0,
            data:[],
            isLoading:true,
            redirect:false,
            id_dp_operation:null,
            search: ''
        }
    }

    componentDidMount(){
        this.handleData(this.state.num_tab)
    }

    handleData(numero){
        this.setState({isLoading: true});
        fetch(API_PATH+'liste/'+numero, {
            method: 'get',
            headers: new Headers({
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': 'bearer '+this.state.api_key
        })}).then( (response) => {
            return response.json()
        })
        .then( (json) => {
            if(json.status === 'success'){
                this.setState({
                    data:json.values
                })
                this.setState({isLoading: false});
            }
            this.setState({isLoading: false});
        });
    };
    
    render(){
        if(this.state.api_key === false){
            return <Redirect to='/' />
        }

        const columns = [{
            Header: 'N° Dossier',
            accessor: 'id_dossierprime' // String-based value accessors!
        }, {
            Header: 'N° Action',
            accessor: 'id_dp_operation',
            //Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Etat',
            accessor: 'statut_operation'
        }, {
            Header: 'Nb Jours res',
            accessor: 'id_dossierprime'
        }, {
            Header: 'MOA',
            accessor: 'id_dossierprime'
        }, {
            Header: 'FOST',
            accessor: 'code_operation'
        }, {
            Header: ' ',
            accessor: 'ddddd'
        }]

        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: e => {
                    this.setState({
                        id_dp_operation:rowInfo.original.id_dp_operation,
                        redirect:true
                    })
                }
            }
        }
        const translations = {previousText: 'Précédent', nextText: 'Suivant', loadingText: 'Chargement...',ofText: 'sur',rowsText: 'lignes'};

        if(this.state.redirect){
            return <Redirect push to={{pathname:'/dossierprime', state: { id_dp_operation:this.state.id_dp_operation, api_key:this.state.api_key}}}/>
        }else{
            let data = this.state.data
            if (this.state.search) {
                data = data.filter(row => {
                    return String(row.id_dp_operation).includes(this.state.search)
                })
            }
            return (
                <div>
                    <HeaderNav api_key={this.state.api_key} from="liste"/>
                    <div className="has-text-centered content-loading">
                        <div id="loading_liste"><Loading show={this.state.isLoading} type="ThreeDots"/></div>
                    </div>
                    <input className="input search-table" placeholder="N° Action" onChange={e => this.setState({search: e.target.value})}/>
                    <Tabs defaultIndex={this.state.num_tab} onSelect={index => this.handleData(index)}>
                        <TabList>
                            <Tab>A traiter</Tab>
                            <Tab>En ligne</Tab>
                            <Tab>Validés</Tab>
                        </TabList>

                        <TabPanel>
                            <ReactTable
                                {...translations}
                                data={data}
                                defaultPageSize={10}
                                className="-striped -highlight cur_pointer"
                                noDataText="Aucun traitement pour cet onglet"
                                columns={columns}
                                getTrProps={onRowClick}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ReactTable
                                {...translations}
                                data={data}
                                defaultPageSize={10}
                                className="-striped -highlight cur_pointer"
                                noDataText="Aucun traitement pour cet onglet"
                                columns={columns}
                                getTrProps={onRowClick}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ReactTable
                                {...translations}
                                data={data}
                                defaultPageSize={10}
                                className="-striped -highlight cur_pointer"
                                noDataText="Aucun traitement pour cet onglet"
                                columns={columns}
                                getTrProps={onRowClick}
                            />
                        </TabPanel>

                    </Tabs>
                </div>
            )
        }
    }
}

export default Liste;