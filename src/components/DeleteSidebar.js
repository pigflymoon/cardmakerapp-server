import React  from 'react';
import {
    Link
} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import CalendarIcon from '@material-ui/icons/PermContactCalendar'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoodIcon from '@material-ui/icons/Mood';
import UpdateIcon from '@material-ui/icons/Update';
import AnnouncementIcon from '@material-ui/icons/Announcement';

export const deleteCardsListItems = (
    <div>
        <ListItem component={Link} to="delete-holidayCards" button>
            <ListItemIcon>
                <InboxIcon style={{color:'orange'}} />
            </ListItemIcon>
            <ListItemText primary="Holiday Cards"/>
        </ListItem>
        <ListItem component={Link} to="delete-birthdayCards" button>
            <ListItemIcon>
                <StarIcon style={{color:'orange'}} />
            </ListItemIcon>
            <ListItemText primary="Birthday Cards"/>
        </ListItem>
        <ListItem component={Link} to="delete-thankyouCards" button>
            <ListItemIcon>
                <SendIcon style={{color:'orange'}}/>
            </ListItemIcon>
            <ListItemText primary="Thank You Cards"/>
        </ListItem>
        <ListItem component={Link} to="delete-occasionsCards" button>
            <ListItemIcon>
                <CalendarIcon style={{color:'orange'}}/>
            </ListItemIcon>
            <ListItemText primary="Occasions Cards"/>
        </ListItem>
        <ListItem component={Link} to="delete-congratulationsCards" button>
            <ListItemIcon>
                <ThumbUpIcon style={{color:'orange'}}/>
            </ListItemIcon>
            <ListItemText primary="Congratulations Cards"/>
        </ListItem>
        <ListItem component={Link} to="delete-thoughtsFeelingsCards" button>
            <ListItemIcon>
                <MoodIcon style={{color:'orange'}}/>
            </ListItemIcon>
            <ListItemText primary="ThoughtsFeelings Cards"/>
        </ListItem>

    </div>
);

export const deleteInvitationsListItems = (
    <div>
        <ListItem component={Link} to="delete-holidayInvitations" button>
            <ListItemIcon>
                <MailIcon style={{color:'red'}}/>
            </ListItemIcon>
            <ListItemText primary="Holiday Invitations"/>
        </ListItem>
        <ListItem component={Link} to="delete-birthdayInvitations" button>
            <ListItemIcon>
                <DeleteIcon style={{color:'red'}}/>
            </ListItemIcon>
            <ListItemText primary="birthday Invitations"/>
        </ListItem>
        <ListItem component={Link} to="delete-weddingInvitations" button>
            <ListItemIcon>
                <ReportIcon style={{color:'red'}}/>
            </ListItemIcon>
            <ListItemText primary="wedding Invitations"/>
        </ListItem>
        <ListItem component={Link} to="delete-partyInvitations" button>
            <ListItemIcon>
                <UpdateIcon style={{color:'red'}}/>
            </ListItemIcon>
            <ListItemText primary="Party Invitations"/>
        </ListItem>
        <ListItem component={Link} to="delete-announcementInvitations" button>
            <ListItemIcon>
                <AnnouncementIcon style={{color:'red'}}/>
            </ListItemIcon>
            <ListItemText primary="Announcement Invitations"/>
        </ListItem>
    </div>
);
