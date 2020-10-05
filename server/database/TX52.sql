DROP DATABASE IF EXISTS tx52 ;

CREATE DATABASE IF NOT EXISTS tx52 ;
USE tx52 ;
# -----------------------------------------------------------------------------
#       TABLE : REPONSE
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS REPONSE
 (
   NUM_REPONSE INTEGER NOT NULL  ,
   REPONSE VARCHAR(128) NULL  
   , PRIMARY KEY (NUM_REPONSE) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : QUESTION
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS QUESTION
 (
   NUM_QUESTION INTEGER NOT NULL  ,
   QUESTION VARCHAR(128) NULL  
   , PRIMARY KEY (NUM_QUESTION) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : POSSEDE
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS POSSEDE
 (
   NUM_QUESTION INTEGER NOT NULL  ,
   NUM_REPONSE INTEGER NOT NULL  ,
   NUM_QUESTION_SUIVANTE INTEGER NULL  
   , PRIMARY KEY (NUM_QUESTION,NUM_REPONSE) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       INDEX DE LA TABLE POSSEDE
# -----------------------------------------------------------------------------


CREATE  INDEX I_FK_POSSEDE_QUESTION
     ON POSSEDE (NUM_QUESTION ASC);

CREATE  INDEX I_FK_POSSEDE_REPONSE
     ON POSSEDE (NUM_REPONSE ASC);


# -----------------------------------------------------------------------------
#       CREATION DES REFERENCES DE TABLE
# -----------------------------------------------------------------------------


ALTER TABLE POSSEDE 
  ADD FOREIGN KEY FK_POSSEDE_QUESTION (NUM_QUESTION)
      REFERENCES QUESTION (NUM_QUESTION) ;


ALTER TABLE POSSEDE 
  ADD FOREIGN KEY FK_POSSEDE_REPONSE (NUM_REPONSE)
      REFERENCES REPONSE (NUM_REPONSE) ;

