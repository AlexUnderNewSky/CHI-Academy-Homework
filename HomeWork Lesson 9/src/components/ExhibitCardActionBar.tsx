import CardActions from "@mui/material/CardActions";
import { useState } from "react";
import React from "react";
import { IconButton, IconButtonProps, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import CommentStripe from "./CommentStripe";
import { textAlign } from "@mui/system";

interface ExhibitCardActionBarPropsI {
  userId: number;
  exhibitId: number;
  children?: React.ReactNode;
}

interface ExpandMorePropsI extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMorePropsI) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

const ExhibitCardActionBar: React.FC<ExhibitCardActionBarPropsI> = ({
  exhibitId,
}) => {
  const [expanded, setExpanded] = useState(false); // Состояние для скрытия/показа

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="body1" sx={{ marginRight: 1 }}>
          Show Comments
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      {/* Передаем expanded и setExpanded в CommentStripe */}
      {expanded && <CommentStripe exhibitId={exhibitId} expanded={expanded} />}
    </>
  );
};

export default ExhibitCardActionBar;
