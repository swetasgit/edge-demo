FROM erin/sle-bci-yolo5

RUN pip uninstall -y opencv-python; pip install opencv-python-headless

COPY requirements.txt /yolov5/requirements.txt
COPY detect.py /yolov5/detect.py

WORKDIR /yolov5/

CMD ["/bin/bash", "-c", "ls; pwd; python3 /yolov5/detect.py --weights /yolov5/suse-chameleon.pt --source 0"]