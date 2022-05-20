FROM registry.suse.com/bci/python

RUN zypper in -y python3-pip python3-pip-wheel gcc python39-devel Mesa-libGL1 system-group-wheel python3-wheel coremltools onnx gsutil notebook libgthread-2_0-0; zypper clean --all

RUN pip3.9 install coremltools onnx gsutil notebook

COPY . .

RUN pip3.9 install -r yolov5/requirements.txt

WORKDIR /yolov5/
CMD ["/bin/bash", "-c", "python3 /yolov5/detect.py --weights /yolov5/suse-chameleon.pt --source $UDEV_DEVNODE"]