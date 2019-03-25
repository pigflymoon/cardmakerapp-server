import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class AlertDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps.open', nextProps.open)
        this.setState({open: nextProps.open, error: nextProps.error})
    }


    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {this.state.error ? 'Upload failure' :'Upload Success'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.error}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AlertDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlertDialog);