import React from "react";

// Material
import Button from "@mui/material//Button";
import Grid from "@mui/material/Grid";

// Icons
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

// utils
import { states } from "../../utils/utils";
import { Typography } from "@mui/material";

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
          color={color}
          sx={styles.button}
          disabled={
            disabled ||
            (disabledCols && i > disabledCols) ||
            status !== states.EMPTY
          }
        >
          {Icon && <Icon sx={styles.icon} />}
          {displayShips && id && <Typography sx={styles.icon}>{id}</Typography>}
        </Button>
      </Grid>
    );
  });

export default React.memo(RowTabla);
