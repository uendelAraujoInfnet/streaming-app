import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Typography variant="body2" align="center" color="textSecondary">
        © {new Date().getFullYear()} IveStreaming. Todos os direitos reservados
        a Uendel Ives de Araujo.
      </Typography>
      <Box className={styles.footerLinks}>
        <Link href="#" color="inherit" underline="hover">
          Termos de Uso
        </Link>
        {" | "}
        <Link href="#" color="inherit" underline="hover">
          Política de Privacidade
        </Link>
        {" | "}
        <Link href="#" color="inherit" underline="hover">
          Contato
        </Link>
      </Box>
      <Box className={styles.socialMedia}>
        <Link href="#" color="inherit" aria-label="Facebook">
          <Facebook />
        </Link>
        <Link href="#" color="inherit" aria-label="Twitter">
          <Twitter />
        </Link>
        <Link href="#" color="inherit" aria-label="Instagram">
          <Instagram />
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
