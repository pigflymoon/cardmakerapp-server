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

export const uploadGalleryListItems = (
    <div>
        <ListItem component={Link} to="upload-Gallery" button>
            <ListItemIcon>
                <StarIcon style={{color:'green'}}/>
            </ListItemIcon>
            <ListItemText primary="Gallery"/>
        </ListItem>
    </div>
)
export const uploadCardsListItems = (
    <div>
      <ListItem component={Link} to="upload-allCards" button>
        <ListItemIcon>
          <StarIcon style={{color:'green'}}/>
        </ListItemIcon>
        <ListItemText primary="All Cards"/>
      </ListItem>
        <ListItem component={Link} to="upload-holidayCards" button>
            <ListItemIcon>
                <InboxIcon style={{color:'green'}}/>
            </ListItemIcon>
            <ListItemText primary="Holiday Cards"/>
        </ListItem>
        <ListItem component={Link} to="upload-birthdayCards" button>
            <ListItemIcon>
                <StarIcon style={{color:'green'}}/>
            </ListItemIcon>
            <ListItemText primary="Birthday Cards"/>
        </ListItem>
        <ListItem component={Link} to="upload-thankyouCards" button>
            <ListItemIcon>
                <SendIcon style={{color:'green'}}/>
            </ListItemIcon>
            <ListItemText primary="Thank You Cards"/>
        </ListItem>
        <ListItem component={Link} to="upload-occasionsCards" button>
            <ListItemIcon>
                <CalendarIcon style={{color:'green'}}/>
            </ListItemIcon>
            <ListItemText primary="Occasions Cards"/>
        </ListItem>
        <ListItem component={Link} to="upload-congratulationsCards" button>
            <ListItemIcon>
                <ThumbUpIcon style={{color:'green'}}/>
            </ListItemIcon>
            <ListItemText primary="Congratulations Cards"/>
        </ListItem>
        <ListItem component={Link} to="upload-thoughtsFeelingsCards" button>
            <ListItemIcon>
                <MoodIcon style={{color:'green'}}/>
            </ListItemIcon>
            <ListItemText primary="ThoughtsFeelings Cards"/>
        </ListItem>
    </div>
);

export const uploadInvitationsListItems = (
    <div>
      <ListItem component={Link} to="upload-allInvitations" button>
        <ListItemIcon>
          <StarIcon style={{color:'blue'}}/>
        </ListItemIcon>
        <ListItemText primary="All Invitations"/>
      </ListItem>
        <ListItem component={Link} to="upload-holidayInvitations" button>
            <ListItemIcon>
                <MailIcon style={{color:'blue'}}/>
            </ListItemIcon>
            <ListItemText primary="Holiday Invitations"/>
        </ListItem>
        <ListItem component={Link} to="upload-birthdayInvitations" button>
            <ListItemIcon>
                <DeleteIcon style={{color:'blue'}}/>
            </ListItemIcon>
            <ListItemText primary="Birthday Invitations"/>
        </ListItem>
        <ListItem component={Link} to="upload-weddingInvitations" button>
            <ListItemIcon>
                <ReportIcon style={{color:'blue'}}/>
            </ListItemIcon>
            <ListItemText primary="Wedding Invitations"/>
        </ListItem>
        <ListItem component={Link} to="upload-partyInvitations" button>
            <ListItemIcon>
                <UpdateIcon style={{color:'blue'}}/>
            </ListItemIcon>
            <ListItemText primary="Party Invitations"/>
        </ListItem>
        <ListItem component={Link} to="upload-announcementInvitations" button>
            <ListItemIcon>
                <AnnouncementIcon style={{color:'blue'}}/>
            </ListItemIcon>
            <ListItemText primary="Announcement Invitations"/>
        </ListItem>
    </div>
);
