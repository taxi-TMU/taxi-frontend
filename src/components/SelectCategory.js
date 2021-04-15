import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  CircularProgress,
  Box,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getRequest } from '../utils/api';
import { createTraining } from '../utils/training';
import UserContext from '../context/UserContext';

const SelectCategory = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  let history = useHistory();

  const [categories, setCategories] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await getRequest('category');
      setCategories(data);
    };
    getData();
  }, []);

  const onClickTraining = async (sub_category_id) => {
    const trainingId = await createTraining(user.id, sub_category_id);
    history.push(`/training/${trainingId}`);
  };

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="lg">
      <Typography component="h2" variant="h4" align="center">
        Auswahl Kategorie
      </Typography>
      <Typography className={classes.padding}>
        In diesem Abschnitt können Sie Ihr Wissen nach Kategory trainieren. Jede
        Kategory hat Unterkategorien. Wählen Sie eine aus und trainieren Sie die
        Fragen. Die Fragen werden nach Zufallsprinzip zusammengesetzt.{' '}
      </Typography>
      {!categories && (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      )}
      {categories &&
        categories.map((category) => {
          return (
            <Accordion key={category._id} className={classes.accordion}>
              <AccordionSummary
                className={classes.summary}
                expandIcon={
                  <ExpandMoreIcon className={classes.accordionIcon} />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{category.name}</Typography>
              </AccordionSummary>
              {category.sub_categories &&
                category.sub_categories.map((sub, index) => {
                  return (
                    <AccordionDetails
                      key={index}
                      className={classes.details}
                      onClick={() => onClickTraining(sub._id)}
                    >
                      <Typography>{sub.name}</Typography>
                    </AccordionDetails>
                  );
                })}
            </Accordion>
          );
        })}
    </Container>
  );
};

export default SelectCategory;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    color: '#ffffff',
    borderRadius: 16,
    border: '2px solid white',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  loginBtn: {
    color: 'secondry',
  },
  accordion: {
    textAlign: 'left',
    width: '100%',
  },
  accordionIcon: {
    color: '#fff',
  },
  summary: {
    background: '#232F37',
    textTransform: 'uppercase',
    color: '#fff',
  },
  details: {
    backgroundColor: 'rgba(35,47,55, 0.9)',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#000',
      cursor: 'pointer',
    },
  },
  padding: {
    padding: 50,
  },
  active: {
    background: '#A3CCC3',
  },
  links: {
    color: 'black',
    textDecoration: 'none',
  },
}));
