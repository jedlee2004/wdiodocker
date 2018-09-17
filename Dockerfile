# Updated docker to copy code from relative directory and create image with selenium, chrome (headless), vnc, windows manager
FROM java

RUN apt-get update
RUN apt-get upgrade -y

# Adding user for running applications, cannot run chrome as root
RUN useradd -ms /bin/bash developer
RUN mkdir -p /home/developer && chown developer:developer /home/developer

# Installing required applications
RUN apt-get install -y \
    build-essential \
    locales \
    curl \
    unzip \
    xvfb \
    xterm \
    x11vnc \
    fluxbox \
    wget \
    wmctrl \
    software-properties-common \
    apt-utils \
    git \
    g++

# Setting the locale of the environment 
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8

ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8 

# Set the Chrome repo and install 
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable

# Downloading Chrome driver
# RUN curl https://chromedriver.storage.googleapis.com/2.42/chromedriver_linux64.zip -o /usr/local/bin/chromedriver
# RUN chmod +x /usr/local/bin/chromedriver

# Downloading and installing Node.js
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

# COPY bash script and give permissions to make it executable
COPY dockerDisplay.sh /
RUN chmod +x dockerDisplay.sh

# Copy code from directory instead of clone repo:
COPY --chown=developer ./ /WebdriverIO
WORKDIR /WebdriverIO

# Installing Automation Dependencies 
RUN npm install 
RUN npm run e2e-setup

# Changing ownership to developer and giving folder permissions after installing dependencies
RUN chown -R developer:developer /WebdriverIO && chmod -R 755 /WebdriverIO

EXPOSE 5920
CMD '/dockerDisplay.sh'