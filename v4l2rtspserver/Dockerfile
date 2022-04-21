FROM mpromonet/v4l2rtspserver

ENTRYPOINT [ "/bin/sh", "-c", "echo $UDEV_DEVNODE; /usr/local/bin/v4l2rtspserver -S $UDEV_DEVNODE" ]
