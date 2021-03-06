#define TRIG_PIN 6
#define ECHO_PIN 5
#define LED 2

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED, OUTPUT);
}

float readDistance(){
  int duration;
  float distances[5];
  float maxValue=0, minValue=5000;

  // Avoid outliers
  for (int i=0; i<5; i++){
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(1000);
    digitalWrite(TRIG_PIN, LOW);
    int duration = pulseIn(ECHO_PIN, HIGH);
    distances[i] = (duration / 2) / 29.1;  
    if (distances[i] < minValue) minValue = distances[i];
    if (distances[i] > maxValue) maxValue = distances[i];
    delay(20);
  }
  float distance = -1;
  for (int i=0; i<5; i++){
    if (distances[i] > minValue && distances[i] < maxValue){
      distance = distances[i];
    }
  }
  if (distance == -1) distance = distances[0];
  if (distance < 0) distance = 0;
  return distance;
}
  
void loop() {
  float distance = readDistance();

  if (distance < 30 && distance > 0){
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
  Serial.println(distance);
  
  delay(200);
}
