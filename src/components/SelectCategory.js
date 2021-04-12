import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getRequest } from "../utils/api";
import { createTraining } from "../utils/training";

const SelectCategory = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState();
  // const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getRequest("category");
      setCategories(data);
    };
    getData();
  }, []);

  const onClickTraining = async (sub_category_id) => {
    const data = await createTraining(
      "606db3200d2141d1da8c0728",
      "6073ea07793b0e3c93a69609",
      true
    );
    // TODO console.log(data);

    // redirect to training with fresh training id
  };

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="lg">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SELECT A CATEGORY
        </Typography>

        <Typography className={classes.padding}>
          In this section you can train your knowledge by category. There are
          five main categories with multiple subcategories.{" "}
        </Typography>

        {!categories && (
          <Typography component="h1" variant="h5">
            Loading ...
          </Typography>
        )}

        {categories &&
          categories.map((category) => {
            return (
              <Accordion key={category._id} className={classes.accordion}>
                <AccordionSummary
                  className={classes.summary}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{category.name}</Typography>
                </AccordionSummary>

                {category.sub_categories &&
                  category.sub_categories.map((sub, index) => {
                    return (
                      <Link
                        to={`/training/${sub._id}`} // TODO set to training id
                        component={RouterLink}
                        key={sub._id}
                        className={classes.links}
                      >
                      <AccordionDetails
                        key={sub._id}
                        className={classes.details}
                        // {index === selectedIndex && }
                        onClick={() => onClickTraining(sub._id)}
                        // classes={{
                        //   root: classes.details,
                        //   checked: classes.active,
                        // }}
                      >
                        <Typography>{sub.name}</Typography>
                      </AccordionDetails>
                      </Link>
                    );
                  })}
              </Accordion>
            );
          })}

        <br />
        <br />
        <br />
      </div>
    </Container>
  );
};

export default SelectCategory;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    color: "#ffffff",
    borderRadius: 16,
    border: "1px solid white",
    borderColor: "primary",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  loginBtn: {
    color: "secondry",
  },
  accordion: {
    textAlign: "left",
    width: "100%",
  },
  summary: {
    background: "#fafafa",
    textTransform: "uppercase",
  },
  details: {
    borderBottom: "1px solid #e6e6e6",
    "&:hover": {
      background: "#A3CCC3",
      cursor: "pointer",
    },
  },
  padding: {
    padding: 50,
  },
  active: {
    background: "#A3CCC3",
  },
  links: {
    color: "black",
    textDecoration: "none",
  },
}));

// const setActive = (index) => {
//   setSelectedIndex(index);
//   console.log(index);
// };
