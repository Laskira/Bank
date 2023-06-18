CREATE DATABASE Pruebas;
USE Pruebas;
CREATE TABLE Usuarios (
	Correo varchar(100) PRIMARY KEY,
	Contrasenia varchar(8) not null,
	Nombre varchar(100) NOT NULL,
	FechaNacimiento date NOT NULL,
	Sexo varchar(1) NOT NULL,
);

CREATE PROCEDURE SPGuardarUsuario
@jsonData varchar(max)
AS BEGIN
	INSERT INTO dbo.Usuarios(Correo,  Contrasenia, Nombre, FechaNacimiento, Sexo)
SELECT Correo, Contrasenia, Nombre, FechaNacimiento, Sexo FROM OPENJSON(@jsonData)
WITH (
	CORREO varchar(100) '$.Correo',
	CONTRASENIA varchar(8) '$.Contrasenia',
	NOMBRE varchar(100) '$.Nombre',
	FECHANACIMIENTO date '$.FechaNacimiento',
	SEXO varchar(1) '$.Sexo'
)
END

--Uso este para consultas dentro del backend
CREATE PROCEDURE SPSListarUsuarios
AS BEGIN
	SELECT * FROM dbo.Usuarios FOR JSON PATH;
END

--Se usa este para consultar al front
CREATE PROCEDURE SPSListarUsuariosSinContrasenia
AS BEGIN
	SELECT Correo, Nombre, FechaNacimiento, Sexo FROM dbo.Usuarios FOR JSON PATH;
END


--Se usa este para consultar a un solo usuario
CREATE PROCEDURE SPSListarUsuario
@id varchar(100)
AS BEGIN
	SELECT * FROM dbo.Usuarios WHERE Correo = @id FOR JSON PATH;
END

CREATE PROCEDURE SPEliminarUsuario
@correo varchar(100)
AS BEGIN
	DELETE FROM dbo.Usuarios WHERE Correo = @correo;
END

CREATE PROCEDURE PSActualizarUsuario
@jsonData varchar(max)
AS BEGIN
	UPDATE U
	SET Correo = T.Correo, Contrasenia = T.Contrasenia, Nombre =  T.Nombre, FechaNacimiento = T.FechaNacimiento, Sexo = T.Sexo
	FROM OPENJSON(@jsonData)
	WITH (
		CORREO varchar(100) '$.Correo',
		CONTRASENIA varchar(8) '$.Contrasenia',
		NOMBRE varchar(100) '$.Nombre',
		FECHANACIMIENTO date '$.FechaNacimiento',
		SEXO varchar(1) '$.Sexo'
	) AS T
	INNER JOIN dbo.Usuarios U ON U.Correo = T.Correo;
END

-- INSERSIÓN DE DATOS DE PRUEBA

DECLARE @jsonData1 VARCHAR(MAX) = '
{
  "Correo": "john@example.com",
  "Contrasenia": "12345678",
  "Nombre": "John Doe",
  "FechaNacimiento": "1990-05-15",
  "Sexo": "M"
}';

DECLARE @jsonData2 VARCHAR(MAX) = '
{
  "Correo": "mary@example.com",
  "Contrasenia": "password",
  "Nombre": "Mary Smith",
  "FechaNacimiento": "1985-12-03",
  "Sexo": "F"
}';

DECLARE @jsonData3 VARCHAR(MAX) = '
{
  "Correo": "james@example.com",
  "Contrasenia": "pass1234",
  "Nombre": "James Johnson",
  "FechaNacimiento": "1992-09-21",
  "Sexo": "M"
}';


DECLARE @jsonData4 VARCHAR(MAX) = '
{
  "Correo": "sara@example.com",
  "Contrasenia": "sara9876",
  "Nombre": "Sara Wilson",
  "FechaNacimiento": "1988-07-08",
  "Sexo": "F"
}';

DECLARE @jsonData5 VARCHAR(MAX) = '
{
  "Correo": "michael@example.com",
  "Contrasenia": "mike4321",
  "Nombre": "Michael Brown",
  "FechaNacimiento": "1993-03-12",
  "Sexo": "M"
}';

DECLARE @jsonData6 VARCHAR(MAX) = '
{
  "Correo": "emily@example.com",
  "Contrasenia": "emily123",
  "Nombre": "Emily Davis",
  "FechaNacimiento": "1991-11-27",
  "Sexo": "F"
}';

DECLARE @jsonData7 VARCHAR(MAX) = '
{
  "Correo": "david@example.com",
  "Contrasenia": "davidp@ss",
  "Nombre": "David Thompson",
  "FechaNacimiento": "1995-02-09",
  "Sexo": "M"
}';


DECLARE @jsonData8 VARCHAR(MAX) = '
{
  "Correo": "linda@example.com",
  "Contrasenia": "password123",
  "Nombre": "Linda Martinez",
  "FechaNacimiento": "1987-04-16",
  "Sexo": "F"
}';

DECLARE @jsonData9 VARCHAR(MAX) = '
{
  "Correo": "alex@example.com",
  "Contrasenia": "alexa123",
  "Nombre": "Alex Johnson",
  "FechaNacimiento": "1994-08-02",
  "Sexo": "M"
}';

DECLARE @jsonData10 VARCHAR(MAX) = '
{
  "Correo": "julia@example.com",
  "Contrasenia": "julia456",
  "Nombre": "Julia Wilson",
  "FechaNacimiento": "1989-06-19",
  "Sexo": "F"
}';

DECLARE @jsonData11 VARCHAR(MAX) = '
{
  "Correo": "robert@example.com",
  "Contrasenia": "robertpass",
  "Nombre": "Robert Davis",
  "FechaNacimiento": "1997-01-25",
  "Sexo": "M"
}';


-- Execute the stored procedure with JSON data
EXEC SPGuardarUsuario @jsonData = @jsonData1;
EXEC SPGuardarUsuario @jsonData = @jsonData2;
EXEC SPGuardarUsuario @jsonData = @jsonData3;
EXEC SPGuardarUsuario @jsonData = @jsonData4;

EXEC SPGuardarUsuario @jsonData = @jsonData5;
EXEC SPGuardarUsuario @jsonData = @jsonData6;
EXEC SPGuardarUsuario @jsonData = @jsonData7;
EXEC SPGuardarUsuario @jsonData = @jsonData8;
EXEC SPGuardarUsuario @jsonData = @jsonData9;
EXEC SPGuardarUsuario @jsonData = @jsonData10;
EXEC SPGuardarUsuario @jsonData = @jsonData11;