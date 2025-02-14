FROM alpine/git AS VCS
RUN cd / && git clone https://github.com/Jenkins-projects57/spring-petclinic-cicd.git

FROM maven:3.9-amazoncorretto-17 AS Builder
COPY --from=VCS /spring-petclinic-cicd /spring-petclinic
RUN cd /spring-petclinic && mvn install -DskipTests

FROM amazoncorretto:17-alpine-jdk
LABEL author="srikanth" org="qt" project="multistage-spc"
ARG HOME_DIR=/spring-petclinic
WORKDIR ${HOME_DIR}
COPY --from=Builder /spring-petclinic/target/spring-*.jar ${HOME_DIR}/spring-petclinc.jar
EXPOSE 8080
CMD [ "java","-jar","spring-petclinc.jar" ]
