//
//  ViewController.swift
//  hwtestSplit
//
//  Created by 史向阳 on 2017/11/28.
//  Copyright © 2017年 史向阳. All rights reserved.
//

import UIKit
import os.log
import Alamofire
import SwiftyJSON
import FacebookCore
import FacebookLogin
import FacebookShare
import FBSDKShareKit
import SwiftSpinner
import EasyToast

class ViewController: UIViewController ,
        UITableViewDelegate , UITableViewDataSource , UIPickerViewDelegate, UIPickerViewDataSource,
            UIWebViewDelegate {

    //MARK: binds

    @IBOutlet weak var waitview: UIActivityIndicatorView!
    @IBOutlet weak var testLabel: UITextField!
    @IBOutlet weak var splitbars: UISegmentedControl!
    @IBOutlet weak var newsview: UITableView! //tableview
    @IBOutlet weak var historicalview: UIWebView! //webview
    @IBOutlet weak var currentview: UIScrollView! //scrollview
    @IBOutlet weak var stockview: UITableView!
    @IBOutlet weak var indicatorview: UIWebView!
    @IBOutlet weak var backbutton: UIBarButtonItem!
    @IBOutlet weak var favourbutton: UIButton!
    @IBOutlet weak var changebutton: UIButton!
    
    var indicate = "price"
    var StockInfo: stockinfo?
    let emptyStar = UIImage( named : "emptystar")
    let fullStar = UIImage( named : "fullstar" )
    var newsdata = [[ "todayisholiday lets happy happy happy","Chuan","8:00","" ],[ "todayisholiday lets happy happy happy","Chuan","8:00","www.baidu.com" ]]
    var stockdata = [["Stock Symbol","AAPL"],["Last Price","156.25"],["Change","0.27(0.17%)"],["Timestamp","8:00"],["Open","156.61"],["Close","155.98"],["Day's Range","155.96-157.75"],["Volume","23,612,246"]]
    let indicatorname = ["price","SMA","EMA","STOCH","RSI","ADX","CCI","BBANDS","MACD"]
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return indicatorname[row]
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return indicatorname.count
    }
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if ( indicate != indicatorname[row] ){
            changebutton.isEnabled = true
        }
        indicate = indicatorname[row]
    }
    func pickerView(_ pickerView: UIPickerView, rowHeightForComponent component: Int) -> CGFloat {
        return 20
    }
    
    var timer = Timer()
    func sth(){
        let jsString = String(format:"finshornot()")
        print(jsString)
        let a = indicatorview.stringByEvaluatingJavaScript(from: jsString)
        if a == "1"{
            waitview.stopAnimating()
            timer.invalidate()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        SwiftSpinner.show("Connecting to satellite...")
        let nib1 = UINib(nibName: "NewsViewCell", bundle: nil)
        newsview.register(nib1, forCellReuseIdentifier: "newsViewCell")
        // Do any additional setup after loading the view, typically from a nib.
        let nib2 = UINib(nibName: "StockViewCell", bundle: nil)
        stockview.register(nib2, forCellReuseIdentifier: "stockViewCell")
        // Do any additional setup after loading the view, typically from a nib.
        currentview.isHidden = false
        historicalview.isHidden = true
        newsview.isHidden = true
        changebutton.isEnabled = false
        
        timer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: (#selector(ViewController.sth)), userInfo: nil, repeats: true)
        
        // Set up views if editing an existing Meal.
        if let StockInfo = StockInfo {
            navigationItem.title = StockInfo.symbol
            stockdata[0][1] = StockInfo.symbol
            if(StockInfo.iffavourlist == 1){
                favourbutton.setImage(emptyStar, for: .normal)
                favourbutton.setImage(emptyStar, for: .selected)
                favourbutton.setImage(emptyStar, for: .highlighted)
                favourbutton.setImage(emptyStar, for: [.highlighted, .selected])
            }
            else{
                favourbutton.setImage(fullStar, for: .normal )
                favourbutton.setImage(fullStar, for: .selected)
                favourbutton.setImage(fullStar, for: .highlighted)
                favourbutton.setImage(fullStar, for: [.highlighted, .selected])
            }
            
            let mainurl = "http://localhost:8081/"
            let newsurl = "\(mainurl)news?symbol=\(StockInfo.symbol)"
            Alamofire.request(newsurl, method: .get).responseJSON {
                response in
                guard let J = response.result.value else { return }
                print(J)
                print("news")
                let jsonObj = JSON(J)["news"]
                self.newsdata.remove(at: 0)
                self.newsdata.remove(at: 0)
                for (_,subJson):(String, JSON) in jsonObj {
                    let authorname = subJson["author"].string ?? ""
                    let titlename = subJson["title"].string ?? ""
                    let datename = subJson["date"].string ?? ""
                    let anchors = subJson["href"].string ?? ""
                    self.newsdata.append([titlename,authorname,datename,anchors])
                }
                self.newsview.reloadData()
            }
            
            let stockurl = "\(mainurl)stocks?symbol=\(StockInfo.symbol)"
            Alamofire.request(stockurl, method: .get).responseJSON {
                response in
                guard let J = response.result.value else { return }
                print(J)
                let a = JSON(J)["Error Message"].string ?? ""
                if(a.contains("rror")){
                    self.view.showToast("Dont enter invalid symbol", position: .bottom, popTime: 5, dismissOnTap: false)
                    SwiftSpinner.hide()
                    return
                }
                print("symbol")
                self.stockdata[3][1] = JSON(J)["Meta Data"]["3. Last Refreshed"].string ?? ""
                let jsonObj = JSON(J)["Time Series (Daily)"]
                var count = 0
                var todayclose:Float = 0
                for (_,subJson):(String, JSON) in jsonObj {
                    if (count == 0 ){
                        let openfilestring = subJson["1. open"].string ?? ""
                        let openfilefloat = (openfilestring as NSString).floatValue
                        self.stockdata[4][1] = String(format: "%.2f", openfilefloat)
                        let closefilestring = subJson["4. close"].string ?? ""
                        let closefilefloat = (closefilestring as NSString).floatValue
                        self.stockdata[5][1] = String(format: "%.2f", closefilefloat)
                        todayclose = closefilefloat
                        let lowdatastring = subJson["3. low"].string ?? ""
                        let lowfilefloat = (lowdatastring as NSString).floatValue
                        let lowdata = String(format: "%.2f", lowfilefloat)
                        let highdatastring = subJson["2. high"].string ?? ""
                        let highfilefloat = (highdatastring as NSString).floatValue
                        let highdata = String(format: "%.2f", highfilefloat)
                        self.stockdata[6][1] = "\(lowdata)-\(highdata)"
                        //self.stockdata[7][1] = subJson["5. volume"].string ?? ""
                        let volumestring = subJson["5. volume"].string ?? ""
                        let volumedata = (volumestring as NSString).intValue
                        let format = NumberFormatter()
                        format.numberStyle = .decimal
                        let stringvolume = format.string(from: NSNumber(value: volumedata))
                        self.stockdata[7][1] = stringvolume ?? ""
                    }
                    else if (count == 1){
                        let closefilestring = subJson["4. close"].string ?? ""
                        let closefilefloat = (closefilestring as NSString).floatValue
                        self.stockdata[1][1] = String(format: "%.2f", closefilefloat)
                        let yesterdayclose = closefilefloat
                        let changedata = todayclose - yesterdayclose
                        let changepercent = changedata / yesterdayclose
                        self.stockdata[2][1] = String(format: "%.2f", changedata)+"("+String(format: "%.2f", changepercent)+"%)"
                        break
                    }
                    count = count + 1
                }
                self.stockview.reloadData()
                SwiftSpinner.hide()
            }
            
            let url = URL(string: "http://localhost:8081/?symbol=\(StockInfo.symbol)")
            let request = URLRequest(url: url!)
            indicatorview.loadRequest(request)
            historicalview.loadRequest(request)
            testLabel.isHidden = true
        }
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if (tableView.tag==0){
            return newsdata.count
        }
        else{
            return stockdata.count
        }
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if (tableView.tag==0){
            let cell = newsview.dequeueReusableCell(withIdentifier: "newsViewCell") as! NewsViewCell
            let str = newsdata[indexPath.row]//.components(separatedBy: " ")
            cell.initial(text1: str[0], text2: str[1], text3: str[2], text4: str[3])
            return cell
        }
        else{
            let cell = stockview.dequeueReusableCell(withIdentifier: "stockViewCell") as! StockViewCell
            let str = stockdata[indexPath.row]//.components(separatedBy: " ")
            cell.initial(text1: str[0], text2: str[1])
            return cell
        }
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if (tableView.tag==0){
            let cell = tableView.cellForRow(at: indexPath) as! NewsViewCell
            cell.linkoutside()
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    //MARK: Navigation
    // This method lets you configure a view controller before it's presented.
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        // Configure the destination view controller only when the save button is pressed.
        guard let button = sender as? UIBarButtonItem, button === backbutton else {
            os_log("The save button was not pressed, cancelling", log: OSLog.default, type: .debug)
            return
        }
        let symbolinput = stockdata[0][1]
        let changeinput = stockdata[2][1]
        let closeinput = stockdata[5][1]
        let iffavour = StockInfo?.iffavourlist
        StockInfo = stockinfo(symbol: symbolinput, change: changeinput, close: closeinput, iffavour: iffavour!)
    }
    
    //MARK: actions
    @IBAction func splitIndexChange(_ sender: UISegmentedControl) {
        switch splitbars.selectedSegmentIndex
        {
        case 0:
            testLabel.text = "First Segment Selected";
            currentview.isHidden = false
            historicalview.isHidden = true
            newsview.isHidden = true
        case 1:
            testLabel.text = "Second Segment Selected";
            currentview.isHidden = true
            historicalview.isHidden = false
            newsview.isHidden = true
            let jsString = String(format:"findmine(\"history\")")
            print(jsString)
            historicalview.stringByEvaluatingJavaScript(from: jsString)
        case 2:
            testLabel.text = "Third Segment Selected";
            currentview.isHidden = true
            historicalview.isHidden = true
            newsview.isHidden = false
        default:
            break
        }
    }
    
    @IBAction func changeIndicator(_ sender: UIButton) {
        let jsString = String(format:"findmine(\"\(indicate)\")")
        print(jsString)
        indicatorview.stringByEvaluatingJavaScript(from: jsString)
        changebutton.isEnabled = false
    }
    
    @IBAction func addintoface(_ sender: UIButton) {
        let para = ["a":"b"]
        Alamofire.request("http://export.highcharts.com", method: .post, parameters: para).responseString { response in
            print(response.result.value!)
            //let img_url = URL(string: "http://export.highcharts.com/\(response.result.value!)")!
            //let img_data = try? Data(contentsOf: img_url)
            //let image:UIImage? = UIImage(data: img_data!)
            let content = LinkShareContent(url: URL(string: "http://export.highcharts.com/\(response.result.value!)")!)
            //let content = PhotoShareContent(photos: [Photo(image: image!, userGenerated: true)])
            let shareDialog = ShareDialog(content: content)
            //let shareDialog = MessageDialog(content: content)
            shareDialog.mode = ShareDialogMode.native
            shareDialog.failsOnInvalidData = true
            shareDialog.completion = { result in
                print(result)
            }
            do{
                try ShareDialog.show(from: self, content: content)
                //try shareDialog.show()
            }
            catch {
                print("error when try share")
            }
        }
    }
    @IBAction func addintofavour(_ sender: UIButton) {
        if(StockInfo?.iffavourlist == 1){
            favourbutton.setImage(fullStar, for: .normal)
            favourbutton.setImage(fullStar, for: .selected)
            favourbutton.setImage(fullStar, for: .highlighted)
            favourbutton.setImage(fullStar, for: [.highlighted, .selected])
            StockInfo?.iffavourlist = 0
            testLabel.text = "gonna deletefrom favour"
        }
        else{
            favourbutton.setImage(emptyStar, for: .normal )
            favourbutton.setImage(emptyStar, for: .selected)
            favourbutton.setImage(emptyStar, for: .highlighted)
            favourbutton.setImage(emptyStar, for: [.highlighted, .selected])
            StockInfo?.iffavourlist = 1
            testLabel.text = "gonna addinto favour"
        }
    }
    
    

}

