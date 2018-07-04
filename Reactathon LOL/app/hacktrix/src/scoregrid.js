import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    //overflowX: "auto"
  },
  button: {
    marginBottom: 15,
    marginLeft: 50,
    float: "center"
  }
});

class CustomPaginationScoreTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        createData("Cupcake", 305, 3.7),
        createData("Donut", 452, 25.0),
        createData("Eclair", 262, 16.0),
        createData("Frozen yoghurt", 159, 6.0),
        createData("Gingerbread", 356, 16.0),
        createData("Honeycomb", 408, 3.2),
        createData("Ice cream sandwich", 237, 9.0),
        createData("Jelly Bean", 375, 0.0),
        createData("KitKat", 518, 26.0),
        createData("Lollipop", 392, 0.2),
        createData("Marshmallow", 318, 0),
        createData("Nougat", 360, 19.0),
        createData("Oreo", 437, 18.0)
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  backClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    var scorearr = [
      {
        teamId: 1,
        teamName: "Team 1",
        teamDescription: "Team 1 Description",
        teamParticipants: [1, 2],
        teamEventId: 1,
        isTeamActive: true,
        teamScore: [
          {
            Architecture: 80,
            Design: 75,
            Build: 75,
            Dev: 90,
            "Unit Testing": 30,
            "System Testing": 50,
            "Integration Testing": 80,
            Deployment: 90
          }
        ],
        teamScoreMaxTotal: 570,
        teamRecognition: "Event 1 Runner Up"
      },
      {
        teamId: 2,
        teamName: "Team 2",
        teamDescription: "Team 2 Description",
        teamParticipants: [3, 4],
        teamEventId: 1,
        isTeamActive: true,
        teamScore: [
          {
            Architecture: 100,
            Design: 80,
            Build: 70,
            Dev: 85,
            "Unit Testing": 100,
            "System Testing": 80,
            "Integration Testing": 90,
            Deployment: 85
          }
        ],
        teamScoreMaxTotal: 690,
        teamRecognition: "Event 1 Winner"
      }
    ];

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Typography variant="title"> board</Typography>
          <br />
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Ranking</CustomTableCell>
                <CustomTableCell>Team</CustomTableCell>
                <CustomTableCell numeric>Score</CustomTableCell>
                <CustomTableCell numeric>Events Participated</CustomTableCell>
                <CustomTableCell numeric>Events Won</CustomTableCell>
                <CustomTableCell numeric>Runners up</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scorearr
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow key={n.teamId}>
                      <TableCell numeric>{n.teamId}</TableCell>
                      <TableCell component="th" scope="row">
                        {n.teamName}
                      </TableCell>
                      <TableCell numeric>{n.teamScoreMaxTotal}</TableCell>
                      {Object.values(n.teamScore[0]).map(function(item) {
                        return (
                          <CustomTableCell numeric>{item}</CustomTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={this.backClick}
          >
            Back
          </Button>
        </div>
      </Paper>
    );
  }
}

CustomPaginationScoreTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(CustomPaginationScoreTable));
