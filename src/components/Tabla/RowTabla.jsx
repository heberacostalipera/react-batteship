import React from "react";

// Material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Icons
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

// utils
import { states } from "../../utils/utils";

const styles = {
  button: {
    p: 0,
    pb: "100%",
    width: "100%",
    minWidth: "auto",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const icons = {
  [`${states.MISSED}`]: BlockIcon,
  [`${states.TOUCHED}`]: CloseIcon,
  [`${states.SINKED}`]: LocalFireDepartmentIcon,
};

const RowTabla = ({
  alwaysEnabled,
  color = "primary",
  disabled,
  disabledCols,
  displayShips,
  onClick,
  row,
}) =>
  row.map(({ status, id }, i) => {
    const Icon = icons[status];
    return (
      <Grid item xs={1} key={i}>
        <Button
          variant="outlined"
          onClick={onClick(i)}
          color={
            status === states.TOUCHED || status === states.SINKED
              ? "secondary"
              : color
          }
          sx={styles.button}
          disabled={
            !alwaysEnabled &&
            (disabled ||
              (disabledCols && i > disabledCols) ||
              status !== states.EMPTY)
          }
        >
          <Box sx={styles.icon}>
            {Icon && <Icon />}
            {displayShips && id && <Typography>{id}</Typography>}
          </Box>
        </Button>
      </Grid>
    );
  });

export default React.memo(RowTabla);
