FROM openjdk:11
COPY build/libs/ROOT-microbundle.jar /opt/application.jar
EXPOSE 8080
CMD java -jar /opt/application.jar