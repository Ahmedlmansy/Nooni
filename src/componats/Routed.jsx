import { useLocation, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function BasicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div role="presentation" className="my-3">
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{ justifyContent: "center", display: "flex", padding: "20px" }}
      >
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={to} sx={{ color: "text.primary" }}>
              {value
                .replace(/%20/g, " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Typography>
          ) : (
            <Link
              key={to}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={to}
            >
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
