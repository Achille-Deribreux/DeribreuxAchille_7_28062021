import React from 'react';
import UserCompo from './usercompo'
import Grid from '@material-ui/core/Grid';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';

class SearchCompo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/auth/getusers",{
          headers:{
            'Authorization' : 'bearer ' + token
          }
        })
        //mieux que localstorage pour passer token? 
          .then(response => response.json())
          .then((results) => {
              this.setState({
                isLoaded: true,
                items: results
              });
            })
          .catch(function(err){
            alert(err) // Affiche l'erreur dans une alert si erreur 
          });
      }
      render(){
        const  {isLoaded, items } = this.state;
        //ICI faire 3 item.map avec conditions pour afficher par branche
          if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
          let salestProfiles = items.filter(item => item.team === "sales")
          let developpementProfiles = items.filter(item => item.team === "dev")
          let hrProfiles = items.filter(item => item.team === "hr")
        return (
        <Container>
          <Row>
            <Col align="center" className="m-3">
                <Tabs className="mb-3">
                  <Tab eventKey="Tous" title="Tous">
                    <Container>
                      <Row>
                        {items.map(item => (
                          <Col xs={12} xl={4} key={item.id} className="m-2 h-100">
                              <UserCompo id={item.id }firstname={item.firstname} profileurl={item.profileurl} lastname={item.lastname} team={item.team}/>
                          </Col>
                          ))}
                      </Row>
                    </Container>
                  </Tab>
                  <Tab eventKey="Développement" title="Développement">
                    <Container>
                        <Row>
                          {developpementProfiles.map(item => (
                            <Col xs={12} xl={4} key={item.id} className="m-2 h-100">
                                <UserCompo id={item.id }firstname={item.firstname} profileurl={item.profileurl} lastname={item.lastname} team={item.team}/>
                            </Col>
                            ))}
                        </Row>
                      </Container>
                  </Tab>
                  <Tab eventKey="HR" title="HR">
                  <Container>
                      <Row>
                        {hrProfiles.map(item => (
                          <Col xs={12} xl={4} key={item.id} className="m-2 h-100">
                              <UserCompo id={item.id }firstname={item.firstname} profileurl={item.profileurl} lastname={item.lastname} team={item.team}/>
                          </Col>
                          ))}
                      </Row>
                    </Container>
                  </Tab>
                  <Tab eventKey="Sales" title="Sales">
                  <Container>
                      <Row>
                        {salestProfiles.map(item => (
                          <Col xs={12} xl={4} key={item.id} className="m-2 h-100">
                              <UserCompo id={item.id }firstname={item.firstname} profileurl={item.profileurl} lastname={item.lastname} team={item.team}/>
                          </Col>
                          ))}
                      </Row>
                    </Container>
                  </Tab>
                </Tabs>
            </Col>
          </Row>
        </Container>

          /*
            <Grid container alignContent='center' alignItems="center" direction='row' spacing={3}>
                    {items.map(item => (
                    <Grid item xs={12} md={4} lg={3} key={item.id} >
                        <UserCompo id={item.id }firstname={item.firstname} lastname={item.lastname} team={item.team}/>
                    </Grid>
                    ))}
                
            </Grid>*/
        );
      }
    }
}

export default SearchCompo ;