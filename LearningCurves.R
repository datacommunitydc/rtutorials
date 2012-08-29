

learningCurves<-function(TrainData, TrainClasses, method, plotLength, plot = TRUE){

 #sampleIndex <-  sample(dim(TrainData)[1])
 #randomize the training data
 
 index <- 1:nrow(TrainData)
 trainindex <- sample(index, trunc(length(index)*.75))
 trainset <- TrainData[trainindex, ]
 testset <- TrainData[-trainindex, ]
 trainclasses <- TrainClasses[trainindex]
 testclasses <- TrainClasses[-trainindex]
 
 stepSize <- ceiling(dim(trainset)[1] / 10)
 
 
 trainSeq <- round(seq(20, dim(trainset)[1], length.out=  plotLength))

output <- data.frame()
 #colnames(output)<- c("n", "error")
for(i in trainSeq){
  fit <- train(trainset[1:i,], trainclasses[1:i],
                   method = method)
 predict <- predict(fit, testset, type = "raw")
 testErrRow<-data.frame(type = "test", n= i, err = 1- (sum(predict == testclasses) / length(testclasses) ))
 predict <- predict(fit, trainset[1:i,], type = "raw")
 trainErrRow<-data.frame(type = "train", n= i, err = 1 - (sum(predict == trainclasses[1:i]) / i) )
 output <- rbind(output, trainErrRow, testErrRow )
  
  
  if(plot){
    p = ggplot(aes(x = n, y= err, color = type),data = output)
    p <- p + geom_point() + xlim(0,trainSeq[length(trainSeq)])
    if(dim(output)[1] > 2){  p<-p + geom_line() }
    print(p)
  }
  
   }
 

 return(output)
}

data(mutagen)
data(sonar)

inTrain <- createDataPartition(d, p = 3/4, list = FALSE)
R>
  R> trainDescr <- descr[inTrain,]
R> testDescr <- descr[-inTrain,]
R> trainClass <- mutagen[inTrain]
R> testClass <- mutagen[-inTrain]

d<-rbind(train,test)
d[,61]
#open up a x11 window
x11()
Plotz()
l<-learningCurves(TrainData = d[,-61],
               TrainClasses =d[,61],
               method = 'nnet',
               plotLength = 10,
               plot = TRUE)


p = ggplot(aes(x = n, y= err, color = type),data = l)
p<-p + geom_line() + geom_point()
p



p<-ggplot(aes(x=))

dim(TrainData)[1] / 10

data(iris)
TrainData <- iris[,1:4]
TrainClasses <- iris[,5]

data(iris)
TrainData <- iris[,1:4]
TrainClasses <- iris[,5]


nnetFit <- train(TrainData, TrainClasses,
                 method = "rf")

data(iris)
set.seed(71)
iris.rf <- randomForest(Species ~ ., data=iris, importance=TRUE,
                        proximity=TRUE)
print(iris.rf)