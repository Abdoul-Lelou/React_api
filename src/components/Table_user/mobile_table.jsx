import React from 'react'
import './mobile_table.css';
import InfiniteScroll from 'react-infinite-scroller';
import { CssBaseline } from '@mui/material';


const MobileTable = ({user}) => {

    console.log(user)
  return (
    <>
    <CssBaseline/>
        <div
        id="scrollableDiv"
        style={{
        height: 'auto',
        overflow: 'auto',
        flexDirection: 'column-reverse',
        }}
        >
            <InfiniteScroll
                pageStart={0}
                loadMore='loadFunc'
                hasMore={true || false}
                //  loader={<div className="loader" key={0}>Loading ...</div>}
                
                scrollableTarget="scrollableDiv"
            >
            <table className="responsive-table color" align="center">
                <caption>Rendez-vous actif <strong>appointValidLength</strong></caption>

                {user && user.map((data,index)=>{
                    return(
                        <>

                        <thead>
                            <tr>
                                <th scope="col">Prénom</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                {/* <th scope=" col">Debut</th>
                                <th scope="col">Fin</th> */}
                                <th scope="col" colSpan="3">Action</th>
                            </tr>
                        </thead>

                        <tbody >
                            <tr key={index}>
                                <td data-title="Patient">{data.first_name}</td>
                                <td data-title="Medecin">{data.last_name}</td>
                                <td data-title="Motif">{data.email}</td>
                                <td data-title="Date">{data.role} </td>
                                <td>
                                    <button type="button" className="btn btn-outline-success btn-block" >
                                        <span><i className="fa fa-toggle-on" aria-hidden="true"></i></span>
                                    </button>
                                    <button  type="button" className="btn btn-outline-danger btn-block">
                                        <span><i className="fa fa-toggle-off" aria-hidden="true"></i></span>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-warning btn-block" >
                                        <span className="fa fa-edit"></span>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger btn-block" >
                                        <span className="fa fa-trash-o"></span>
                                    </button>
                                </td>
                            </tr>
                            

                        </tbody>

                        </>
                    )
                })  } 

                        <tfoot>
                            <tr>
                                <td>
                                    <em>
                                        <em>
                                            <img src="/assets/logo_kidscare.svg" height="28" alt="KIDSCARE" />KIDSCARE©
                                        </em>
                                    </em>
                                </td>
                            </tr>
                        </tfoot>
            </table>
            </InfiniteScroll>
        </div>
    </>    
  )
}

export default MobileTable