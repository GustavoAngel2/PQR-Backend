@echo off
ipconfig | findstr /r IPv4
set /p ip=Inserte su ip o localhost, dejar en blanco para cancelar: || goto error
if %ip% == localhost goto :local
ng serve --host %ip%
exit

:error
echo Host cancelado!

:local
ng serve