import React from 'react';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { Container, Row, Col, Button, Image, ButtonGroup } from 'react-bootstrap';
import { withStyles } from "@material-ui/core/styles";
import { toast } from 'react-toastify';
import {withRouter} from "react-router-dom";


const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
    margin: "8px"
  }
})(Typography);

class ProfileHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          id : '',
          connectedUserId :''
        };
      }
    
      componentDidMount() {
        let token = localStorage.getItem('token');
        const id = (new URL(document.location)).searchParams.get('id');
        fetch("http://localhost:3000/api/auth/".concat(id),{
          headers:{
            'Authorization' : 'bearer ' + token
          }
        })
          .then(response => response.json())
          .then((results) => {
              this.setState({
                isLoaded: true,
                items: results
              });
              fetch("http://localhost:3000/api/auth/getuserId",{
                headers:{
                    'Authorization' : 'bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => response.json())
            .then((res) => {
              this.setState({
                connectedUserId : res.userId.userId
              })
            })
          .catch(function(err){
            alert(err) // Affiche l'erreur dans une alert si erreur 
          });
      })
    }
      editRedirect = () => {
        const {userId} = this.props;
        this.props.history.push("/profileUpdate/?id="+userId);
      }
      deletePost = () => {
        const deleteBody = new FormData();
        const {userId} = this.props;
        deleteBody.append('accountId', userId);
  
        fetch("http://localhost:3000/api/auth/delete",{
          method:'DELETE',
            headers:{
              'Authorization' : 'bearer ' + localStorage.getItem('token')
            },
            body : deleteBody
          })
          .then((res)=> {
            toast.success('Profil supprim?? !', {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              setTimeout(() => { 
                localStorage.clear()
                  this.props.history.push('/signup');
              }, 1500)
          })
          .catch((res)=>console.log(res))
      }

      renderActions= () => { 
        const id = (new URL(document.location)).searchParams.get('id');
        if (this.state.connectedUserId.toString() === id ) {
          return (
          <ButtonGroup aria-label="Basic example">
          <Button variant="transparent" onClick={this.editRedirect}><EditIcon color="primary"/></Button>
          <Button variant="transparent" onClick={this.deletePost}>  <CancelIcon style={{ color: 'red' }} /></Button>
        </ButtonGroup>)
        }else{
          return
        }
      }

      returnImage = () => {
        if (this.state.items.user.profileurl){
          return  <Image src={this.state.items.user.profileurl} className="w-100" roundedCircle/>
        }
        else {
          return  <Avatar>
                    {this.state.items.user.firstname[0]+this.state.items.user.lastname[0]}
                  </Avatar>
        }
      }

      render(){
        const  {isLoaded, items } = this.state;
          if (!isLoaded) {
          return <div>Chargement???</div>;
        } else {
            return(
                  <Container className="m-auto bg-dark rounded">
                    <Row className="align-items-center p-4 mt-3">
                      <Col align="center">
                        {this.returnImage()}
                      </Col>

                      <Col align="center" xs={12} md={6}>
                        <WhiteTextTypography variant="h3">
                          {items.user.firstname+" "+items.user.lastname}
                        </WhiteTextTypography>
                      </Col>

                      <Col align="center">
                        {this.renderActions()}
                      </Col>
                    </Row>
                  </Container>
            )
      }
    }
}

export default withRouter(ProfileHeader);